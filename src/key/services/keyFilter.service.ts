import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Key } from '../entities/key.entity';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { KeyResponseMapper } from '../mapper/KeyResponseMapper';

@Injectable()
export class KeyFilterService {
  constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  public async run(paginationAndSearchDto: PaginationAndSearchDto) {
    const { limit = 10, offset = 0, search = '' } = paginationAndSearchDto;
    const queryBuilder = this.keyRepository.createQueryBuilder();

    const searchToLowerCase = search.toLowerCase();

    const keys = await queryBuilder
      .leftJoinAndSelect('Key.user', 'user')
      .where('LOWER(Key.keyName) LIKE :search', {
        search: `%${searchToLowerCase}%`,
      })
      .orWhere('LOWER(user.fullName) LIKE :search', {
        search: `%${searchToLowerCase}%`,
      })
      .take(limit)
      .skip(offset)
      .orderBy('Key.createdAt', 'DESC')
      .getManyAndCount();

    return KeyResponseMapper.toResponseKeysDto(keys);
  }
}
