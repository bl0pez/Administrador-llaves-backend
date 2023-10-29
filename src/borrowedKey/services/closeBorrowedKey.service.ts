import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BorrowedKey } from '../entities/borroweKey.entity';
import { ToggleKeyStateService } from 'src/key/services';
import { FindOpenBorrowedKeyService } from './findOpenBorrwoedKey.service';
import { BorrwoedKeyResponseMapper } from '../mapper/responseBorrowedKeyMapper';

@Injectable()
export class CloseBorrowedKeyService {
  public constructor(
    @InjectRepository(BorrowedKey)
    private readonly borrowedKeyRepository: Repository<BorrowedKey>,
    private readonly findOpenBorrowedKeyService: FindOpenBorrowedKeyService,
    private readonly toggleKeyStateService: ToggleKeyStateService,
  ) {}

  public async run(borrowedKeyId: string) {
    const borrowedKey =
      await this.findOpenBorrowedKeyService.run(borrowedKeyId);

    if (!borrowedKey) {
      throw new NotFoundException('Llave prestada no encontrada');
    }

    await this.toggleKeyStateService.run(borrowedKey.key.keyId, false);
    await this.borrowedKeyRepository.update(borrowedKey.borrowedKeyId, {
      isOpened: false,
    });

    borrowedKey.isOpened = false;

    return BorrwoedKeyResponseMapper.toResponseBorrowedKeyDto(borrowedKey);
  }
}
