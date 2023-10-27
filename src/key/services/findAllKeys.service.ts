import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Key } from '../entities/key.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { KeyResponseMapper } from '../mapper/KeyResponseMapper';

@Injectable()
export class FindAllKeysService {
  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  public async run(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const keys = await this.keyRepository.findAndCount({
      relations: ['user'],
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return KeyResponseMapper.toResponseKeysDto(keys);
  }
}
