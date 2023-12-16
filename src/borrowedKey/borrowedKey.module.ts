import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BorrowedKey } from './entities/borroweKey.entity';
import { KeyModule } from 'src/key/key.module';
import { BorrowedKeyController } from './borrowedKey.controller';
import { BorrowedKeyService } from './borrowedKey.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedKey]), KeyModule],
  providers: [BorrowedKeyService],
  controllers: [BorrowedKeyController],
})
export class BorrowedKeyModule {}
