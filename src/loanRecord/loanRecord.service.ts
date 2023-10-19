import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoanRecord } from './entities/loadRecord.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanRecordDto } from './dto/create-loadRecord.dto';
import { User } from '../auth/entities/user.entity';
import { KeyService } from 'src/key/key.service';

@Injectable()
export class LoanRecordService {
  public constructor(
    @InjectRepository(LoanRecord)
    private readonly loanRecordRepository: Repository<LoanRecord>,
    private readonly keyService: KeyService,
  ) {}

  public async create(user: User, createLoanRecordDto: CreateLoanRecordDto) {
    const { keyId, borrowerName, borrowerServiceOrCompany } =
      createLoanRecordDto;

    const key = await this.keyService.validateKeyAvailability(keyId);

    try {
      const loanRecord = this.loanRecordRepository.create({
        borrowerName,
        borrowerServiceOrCompany,
        user,
        key,
      });

      await this.loanRecordRepository.save(loanRecord);
      await this.keyService.updateKeyIsBorrowed(keyId, true);

      return loanRecord;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Error while saving data');
  }
}
