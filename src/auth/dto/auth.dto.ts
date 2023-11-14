import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto';

export class AuthDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  token: string;
}
