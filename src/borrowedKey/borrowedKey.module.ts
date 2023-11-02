import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BorrowedKey } from './entities/borroweKey.entity';
import { KeyModule } from 'src/key/key.module';
import { BorrowedKeyController } from './borrowedKey.controller';
import {
  BorrowedKeyFilterService,
  BorrowedKeyHistoryService,
  CloseBorrowedKeyService,
  CreateBorrowedKeyService,
  FindAllBorrowedKeyService,
  FindOpenBorrowedKeyService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedKey]), KeyModule],
  providers: [
    BorrowedKeyFilterService,
    BorrowedKeyHistoryService,
    CloseBorrowedKeyService,
    CreateBorrowedKeyService,
    FindAllBorrowedKeyService,
    FindOpenBorrowedKeyService,
  ],
  controllers: [BorrowedKeyController],
})
export class BorrowedKeyModule {}
