import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { BorrowedKey } from '../entities/borroweKey.entity';
import { BorrwoedKeyResponseMapper } from '../mapper/responseBorrowedKeyMapper';

@Injectable()
export class BorrowedKeyFilterService {
  constructor(
    @InjectRepository(BorrowedKey)
    private readonly borrowedKeyRepository: Repository<BorrowedKey>,
  ) {}

  public async run(paginationAndSearchDto: PaginationAndSearchDto) {
    const { limit = 10, offset = 0, search = '' } = paginationAndSearchDto;

    const searchToLowerCase = search.toLowerCase();

    const borrowedKeys = await this.borrowedKeyRepository
      .createQueryBuilder()
      .leftJoinAndSelect('BorrowedKey.key', 'key')
      .leftJoinAndSelect('BorrowedKey.user', 'user')
      .where(
        'LOWER(key.keyName) LIKE :search  and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: true,
        },
      )
      .orWhere(
        'LOWER(BorrowedKey.borrowerName) LIKE :search and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: true,
        },
      )
      .take(limit)
      .skip(offset)
      .orderBy('BorrowedKey.createdAt', 'DESC')
      .getManyAndCount();

    return BorrwoedKeyResponseMapper.toResponseBorrowedKeysDto(borrowedKeys);
  }
}
