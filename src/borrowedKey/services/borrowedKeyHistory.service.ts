import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BorrowedKey } from '../entities/borroweKey.entity';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { BorrwoedKeyResponseMapper } from '../mapper/responseBorrowedKeyMapper';

@Injectable()
export class BorrowedKeyHistoryService {
  public constructor(
    @InjectRepository(BorrowedKey)
    private readonly borrowedKeyRepository: Repository<BorrowedKey>,
  ) {}

  public async run(paginationAndSearchDto: PaginationAndSearchDto) {
    const searchToLowerCase = paginationAndSearchDto.search.toLowerCase();

    const borrowedKeys = await this.borrowedKeyRepository
      .createQueryBuilder()
      .leftJoinAndSelect('BorrowedKey.key', 'key')
      .leftJoinAndSelect('BorrowedKey.user', 'user')
      .where(
        'LOWER(key.keyName) LIKE :search  and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: false,
        },
      )
      .orWhere(
        'LOWER(BorrowedKey.borrowerName) LIKE :search and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: false,
        },
      )
      .orWhere(
        'LOWER(user.fullName) LIKE :search  and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: false,
        },
      )
      .take(paginationAndSearchDto.limit)
      .skip(paginationAndSearchDto.offset)
      .orderBy('BorrowedKey.updatedAt', 'DESC')
      .getManyAndCount();

    return BorrwoedKeyResponseMapper.toResponseBorrowedKeysDto(borrowedKeys);
  }
}
