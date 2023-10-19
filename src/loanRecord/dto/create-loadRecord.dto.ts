import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateLoanRecordDto {
  @ApiProperty({
    description: 'Nombre del solicitante',
    example: 'Pedro Perez',
  })
  @IsString()
  borrowerName: string;

  @ApiProperty({
    description: 'Servicio o empresa del solicitante',
    example: 'Medicina',
  })
  @IsString()
  borrowerServiceOrCompany: string;

  @ApiProperty({
    description: 'Id de la llave',
    example: 'f9d7e1a0-1d1c-4f5f-9f8e-7a5f4c1c4e8e',
  })
  @IsUUID()
  keyId: string;
}
