import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '../entities/key.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToggleKeyStateService {
  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  public async run(keyId: string, status: boolean) {
    return await this.keyRepository.update(keyId, {
      isBorrowed: status,
    });
  }
}
