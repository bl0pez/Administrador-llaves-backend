import { LoanRecord } from '../entities/loadRecord.entity';
import { ResponseLoadRecordDto } from '../dto/response-loadRecord.dto';

export abstract class ResponseLoadRecordMapper {
  public static toResponseLoadRecordDto(loanRecord: LoanRecord) {
    return ResponseLoadRecordDto.builder()
      .loanRecordId(loanRecord.loanRecordId)
      .borrowerName(loanRecord.borrowerName)
      .borrowerServiceOrCompany(loanRecord.borrowerServiceOrCompany)
      .createdAt(loanRecord.createdAt)
      .updatedAt(loanRecord.updatedAt)
      .keyName(loanRecord.key.keyName)
      .operator(loanRecord.user.fullName)
      .borrowed(loanRecord.createdAt !== loanRecord.updatedAt)
      .build();
  }
}
