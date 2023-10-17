import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateKeyDto {
  @ApiProperty({
    description: 'Nombre de la llave',
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  keyName: string;

  @ApiProperty({
    description: 'Descripción de la llave',
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  keyDescription: string;

  @ApiProperty({
    description: 'Nombre de la persona que entrega la llave',
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  deliveredBy: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Imagen de la llave',
  })
  file: any;
}
