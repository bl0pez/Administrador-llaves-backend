import { Module } from '@nestjs/common';
import { LoanRecord } from './entities/loadRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoandRecordController } from './loanRecord.controller';
import { LoanRecordService } from './loanRecord.service';
import { KeyModule } from 'src/key/key.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRecord]), KeyModule],
  providers: [LoanRecordService],
  controllers: [LoandRecordController],
})
export class LoanRecordModule {}
