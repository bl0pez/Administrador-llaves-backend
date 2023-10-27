import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBorrowedKeyDto {
  @ApiProperty({
    description: 'The key id',
    type: String,
    required: true,
  })
  @IsUUID()
  keyId: string;

  @ApiProperty({
    description: 'The borrower name',
    type: String,
    required: true,
  })
  @IsString()
  borrowerName: string;

  @ApiProperty({
    description: 'The borrower service or company',
    type: String,
    required: true,
  })
  @IsString()
  borrowerServiceOrCompany: string;
}
