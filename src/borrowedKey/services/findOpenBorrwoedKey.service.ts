import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BorrowedKey } from '../entities/borroweKey.entity';

@Injectable()
export class FindOpenBorrowedKeyService {
  @InjectRepository(BorrowedKey)
  private readonly borrowedKeyRepository: Repository<BorrowedKey>;

  public async run(borrwoedKeyId: string): Promise<BorrowedKey> {
    return this.borrowedKeyRepository.findOne({
      relations: ['key', 'user'],
      where: {
        borrowedKeyId: borrwoedKeyId,
        isOpened: true,
      },
    });
  }
}
