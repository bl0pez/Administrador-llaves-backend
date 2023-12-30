import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from './entities/key.entity';
import { UserDto } from 'src/user/dto';
import { CreateKeyDto } from './dto';
import { KeyResponseMapper } from './mapper/KeyResponseMapper';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseKeyDto } from './dto/response-key.dto';
import { ResponseKeysDto } from './dto/response-keys.dto';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';

@Injectable()
export class KeyService {
  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  public async create(
    userDto: UserDto,
    createKeyDto: CreateKeyDto,
    file: Express.Multer.File,
  ): Promise<ResponseKeyDto> {
    if (!file) throw new BadRequestException('Se debe enviar una imagen');

    const create = this.keyRepository.create({
      ...createKeyDto,
      user: userDto,
      image: file.filename,
    });

    const key = await this.keyRepository.save(create);

    return KeyResponseMapper.toResponseKeyDto(key);
  }

  public async findById(keyId: string): Promise<Key> {
    return await this.keyRepository.findOneBy({ keyId });
  }

  public async findAll(paginationDto: PaginationDto): Promise<ResponseKeysDto> {
    const { limit, offset } = paginationDto;

    const keys = await this.keyRepository.findAndCount({
      relations: ['user'],
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return KeyResponseMapper.toResponseKeysDto(keys);
  }

  public async filter(
    paginationAndSearchDto: PaginationAndSearchDto,
  ): Promise<ResponseKeysDto> {
    const { limit, search, offset } = paginationAndSearchDto;

    const searchToLowerCase = search.toLocaleLowerCase();
    const queryRunner = this.keyRepository.createQueryBuilder();

    const keys = await queryRunner
      .leftJoinAndSelect('Key.user', 'user')
      .where('LOWER(Key.keyName) LIKE :search', {
        search: `%${searchToLowerCase}%`,
      })
      .orWhere('LOWER(user.fullName) LIKE :search', {
        search: `%${searchToLowerCase}%`,
      })
      .take(limit)
      .skip(offset)
      .orderBy('Key.createdAt', 'DESC')
      .getManyAndCount();

    return KeyResponseMapper.toResponseKeysDto(keys);
  }

  public async checkAvailability() {
    return await this.keyRepository.find({
      where: {
        isBorrowed: false,
      },
      select: ['keyId', 'keyName'],
    });
  }

  public async updateBorrowed(keyId: string, isBorrowed: boolean) {
    try {
      return await this.keyRepository.update(keyId, { isBorrowed });
    } catch (error) {
      console.log(error);
    }
  }
}
