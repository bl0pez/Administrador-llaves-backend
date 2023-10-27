import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedKey } from './entities/borroweKey.entity';
import { KeyModule } from 'src/key/key.module';
import { FindAllBorrowedKeyService } from './services/findAllBorrowedKey.service';
import { BorrowedKeyController } from './borrowedKey.controller';
import { CreateBorrowedKeyService } from './services/createBorrowedKey.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedKey]), KeyModule],
  providers: [FindAllBorrowedKeyService, CreateBorrowedKeyService],
  controllers: [BorrowedKeyController],
})
export class BorrowedKeyModule {}
