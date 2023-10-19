import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { LoanRecordService } from './loanRecord.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateLoanRecordDto } from './dto/create-loadRecord.dto';

@ApiTags('llaves prestadas')
@ApiBearerAuth()
@Controller('api/v2/loanRecord')
@Auth()
export class LoandRecordController {
  public constructor(private readonly loanRecordService: LoanRecordService) {}

  @Post('create')
  public async create(
    @GetUser() user: User,
    @Body() createLoanRecordDto: CreateLoanRecordDto,
  ) {
    return this.loanRecordService.create(user, createLoanRecordDto);
  }
}
