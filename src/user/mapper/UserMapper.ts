import { User } from 'src/auth/entities/user.entity';
import { UserDto, UsersAndCountDto } from '../dto';

export abstract class UserMapper {
  public static toUserDto(user: User) {
    return UserDto.builder()
      .created_at(user.created_at)
      .email(user.email)
      .fullName(user.fullName)
      .id(user.id)
      .roles(user.roles)
      .updated_at(user.updated_at)
      .build();
  }

  public static toUsersAndCountDto([users, count]: [User[], number]) {
    return UsersAndCountDto.builder()
      .users(users.map((user) => this.toUserDto(user)))
      .count(count)
      .build();
  }
}
