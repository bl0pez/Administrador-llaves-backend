import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { UserMapper } from './mapper/UserMapper';
import { CreateUserDto } from 'src/auth/dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';

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
        created_at: 'DESC',
      },
    });

    return UserMapper.toUsersAndCountDto(users);
  }

  public async search(paginationAndSearchDto: PaginationAndSearchDto) {
    const { search, limit, offset } = paginationAndSearchDto;

    const searchToLowerCase = search.toLowerCase();

    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.fullName) LIKE :fullName', {
        fullName: `%${searchToLowerCase}%`,
      })
      .orWhere('LOWER(user.email) LIKE :email', {
        email: `%${searchToLowerCase}%`,
      })
      .take(limit)
      .skip(offset)
      .orderBy('created_at', 'DESC')
      .getManyAndCount();

    return UserMapper.toUsersAndCountDto(users);
  }

  public async create(user: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      });

      const saveUser = await this.userRepository.save(newUser);

      delete saveUser.password;

      return UserMapper.toUserDto(saveUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  public async update(id: string, user: UpdateUserDto) {
    try {
      const userToUpdate = await this.userRepository.preload({
        id: id,
        ...user,
      });
      const saveUser = await this.userRepository.save(userToUpdate);
      delete saveUser.password;
      return UserMapper.toUserDto(saveUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException('El email ya existe');

    throw new InternalServerErrorException('Error al crear el usuario.');
  }
}
