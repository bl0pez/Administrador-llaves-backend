import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(paginationDto: PaginationDto) {
    return this.userRepository.findAndCount({
      skip: paginationDto.offset,
      take: paginationDto.limit,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
