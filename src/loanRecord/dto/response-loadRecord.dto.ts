import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class ResponseLoadRecordDto {
  @ApiProperty()
  loanRecordId: string;
  keyName: string;
  operator: string;
  createdAt: Date;
  updatedAt: Date;
  borrowerName: string;
  borrowerServiceOrCompany: string;
  borrowed: boolean;

  public static builder() {
    return Builder<ResponseLoadRecordDto>();
  }
}
