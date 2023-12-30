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
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { CreateBorrowedKeyDto, ResponseBorrowedKeyDto } from './dto';

import { BorrowedKeyService } from './borrowedKey.service';

@ApiTags('Llaves prestadas')
@ApiBearerAuth()
@Controller('api/v2/borrowed-keys')
@Auth()
export class BorrowedKeyController {
  public constructor(private readonly borrowedKeyService: BorrowedKeyService) {}

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
    return this.borrowedKeyService.create(user, createBorrowedKeyDto);
  }

  @Get()
  public async findAll(@Query() paginationDto: PaginationDto) {
    return this.borrowedKeyService.findAll(paginationDto);
  }

  @Get('/history')
  public async getRecord(
    @Query() paginationAndSearchDto: PaginationAndSearchDto,
  ) {
    return this.borrowedKeyService.history(paginationAndSearchDto);
  }

  @Get('filter')
  public async findBorrowedKeyByNameAndUserName(
    @Query() paginationAndSearchDto: PaginationAndSearchDto,
  ) {
    return this.borrowedKeyService.filter(paginationAndSearchDto);
  }

  @Patch('/close/:borrowedKeyId')
  public async close(
    @Param('borrowedKeyId') borrowedKeyId: string,
    @GetUser() user: User,
  ) {
    return this.borrowedKeyService.close(borrowedKeyId, user);
  }
}
