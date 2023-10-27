import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BorrowedKey } from '../entities/borroweKey.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BorrwoedKeyResponseMapper } from '../mapper/responseBorrowedKeyMapper';
import { ResponseBorrwoedKeys } from '../dto/response-borrowedkeys.dto';

@Injectable()
export class FindAllBorrowedKeyService {
  public constructor(
    @InjectRepository(BorrowedKey)
    private readonly borrowedKeyRepository: Repository<BorrowedKey>,
  ) {}

  public async run(
    PaginationDto: PaginationDto,
  ): Promise<ResponseBorrwoedKeys> {
    const borrowedKeys = await this.borrowedKeyRepository.findAndCount({
      where: {
        isOpened: true,
      },
      relations: ['key', 'user'],
      take: PaginationDto.limit,
      skip: PaginationDto.offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return BorrwoedKeyResponseMapper.toResponseBorrowedKeysDto(borrowedKeys);
  }
}
