import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import {
  CloseBorrowedKeyService,
  CreateBorrowedKeyService,
  FindAllBorrowedKeyService,
} from './services';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateBorrowedKeyDto } from './dto/create-borrowedKey.dto';
import { User } from 'src/auth/entities/user.entity';
import { ResponseBorrowedKeyDto } from './dto/response-borrowedKey.dto';

@ApiTags('Llaves prestadas')
@ApiBearerAuth()
@Controller('api/v2/borrowed-keys')
@Auth()
export class BorrowedKeyController {
  public constructor(
    private readonly findAllBorrowedKeyService: FindAllBorrowedKeyService,
    private readonly createBorrowedKeyService: CreateBorrowedKeyService,
    private readonly closeBorrowedKeyService: CloseBorrowedKeyService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: ResponseBorrowedKeyDto,
  })
  @Post()
  public async create(
    @GetUser() user: User,
    @Body() createBorrowedKeyDto: CreateBorrowedKeyDto,
  ) {
    return this.createBorrowedKeyService.run(user, createBorrowedKeyDto);
  }

  @Get()
  public async findAll(@Query() paginationDto: PaginationDto) {
    return this.findAllBorrowedKeyService.run(paginationDto);
  }

  @Patch('/close/:borrowedKeyId')
  public async close(@Param('borrowedKeyId') borrowedKeyId: string) {
    return this.closeBorrowedKeyService.run(borrowedKeyId);
  }
}
