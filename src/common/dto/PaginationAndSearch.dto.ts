import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsString } from 'class-validator';

export class PaginationAndSearchDto extends PartialType(PaginationDto) {
  @IsString()
  search: string;
}
