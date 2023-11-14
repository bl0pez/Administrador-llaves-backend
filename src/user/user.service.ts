import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { UserMapper } from './mapper/UserMapper';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(paginationDto: PaginationDto) {
    const users = await this.userRepository.findAndCount({
      skip: paginationDto.offset,
      take: paginationDto.limit,
      order: {
        created_at: 'ASC',
      },
    });

    return UserMapper.toUsersAndCountDto(users);
  }
}
