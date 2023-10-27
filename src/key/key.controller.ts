import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateKeyDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  FindAllKeysService,
  CreateKeyService,
  KeyAvailabilityService,
} from './services';
import { ResponseKeyDto } from './dto/response-key.dto';
import { KeyFilterService } from './services/keyFilter.service';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';

@ApiTags('Llaves')
@ApiBearerAuth()
@Controller('api/v2/keys')
@Auth()
export class KeyController {
  public constructor(
    private readonly createKeyService: CreateKeyService,
    private readonly findAllKeysService: FindAllKeysService,
    private readonly keyFilterService: KeyFilterService,
    private readonly keyAvailabilityService: KeyAvailabilityService,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseKeyDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createKeyDto: CreateKeyDto,
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.createKeyService.run(user, createKeyDto, file);
  }

  @Get()
  public async findAll(@Query() paginationDto: PaginationDto) {
    return this.findAllKeysService.run(paginationDto);
  }

  @Get('filter')
  public async findKeyByNameAndUserName(
    @Query() paginationAndSearchDto: PaginationAndSearchDto,
  ) {
    return this.keyFilterService.run(paginationAndSearchDto);
  }

  @Get('available')
  public async getAvailableKeys() {
    return this.keyAvailabilityService.run();
  }
}
