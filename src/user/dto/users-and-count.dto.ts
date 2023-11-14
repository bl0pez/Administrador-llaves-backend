import { Builder } from 'builder-pattern';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UsersAndCountDto {
  @ApiProperty({
    type: [UserDto],
  })
  users: UserDto[];

  @ApiProperty()
  count: number;

  public static builder() {
    return Builder<UsersAndCountDto>();
  }
}
