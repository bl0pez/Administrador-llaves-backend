import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class UserDto {
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  deleted_at: Date | null;
  @ApiProperty()
  email: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  roles: string[];
  @ApiProperty()
  updated_at: Date | null;

  public static builder() {
    return Builder<UserDto>();
  }
}
