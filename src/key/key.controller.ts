import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
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
import { CreateKeyDto, UpdateKeyDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseKeyDto } from './dto/response-key.dto';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helper';
import { KeyService } from './key.service';

@ApiTags('Llaves')
@ApiBearerAuth()
@Controller('api/v2/keys')
@Auth()
export class KeyController {
  public constructor(private readonly keyService: KeyService) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseKeyDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
      storage: diskStorage({
        destination: './public/uploads',
        filename: fileNamer,
      }),
    }),
  )
  public async create(
    @Body() createKeyDto: CreateKeyDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.keyService.create(user, createKeyDto, file);
  }

  @Get()
  public async findAll(@Query() paginationDto: PaginationDto) {
    return this.keyService.findAll(paginationDto);
  }

  @Get('filter')
  public async findKeyByNameAndUserName(
    @Query() paginationAndSearchDto: PaginationAndSearchDto,
  ) {
    return this.keyService.filter(paginationAndSearchDto);
  }

  @Get('available')
  public async getAvailableKeys() {
    return this.keyService.checkAvailability();
  }

  @Patch('update/:keyId')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseKeyDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
      storage: diskStorage({
        destination: './public/uploads',
        filename: fileNamer,
      }),
    }),
  )
  public async update(
    @Param('keyId') keyId: string,
    @Body() updateKeyDto: UpdateKeyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.keyService.update(keyId, updateKeyDto, file);
  }

  @Delete('delete/:keyId')
  public async delete(@Param('keyId') keyId: string) {
    return this.keyService.delete(keyId);
  }
}
