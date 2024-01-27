import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateKeyDto } from './create-key.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateKeyDto extends PartialType(CreateKeyDto) {
  @ApiProperty({
    description: 'Imagen de la llave',
    type: String,
  })
  @IsString()
  @IsOptional()
  image: string;
}
