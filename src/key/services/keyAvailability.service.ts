import { Injectable } from '@nestjs/common';
import { Key } from '../entities/key.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KeyAvailabilityService {
  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  public async run() {
    return await this.keyRepository.find({
      where: {
        isBorrowed: false,
      },
      select: ['keyId', 'keyName'],
    });
  }
}
