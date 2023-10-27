import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '../entities/key.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindKeyByIdService {
  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  public async run(keyId: string): Promise<Key | null> {
    return await this.keyRepository.findOne({
      where: { keyId },
    });
  }
}
