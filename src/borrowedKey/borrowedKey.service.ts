import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowedKey } from './entities/borroweKey.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/user/dto';
import { CreateBorrowedKeyDto } from './dto';
import { KeyService } from 'src/key/key.service';
import { BorrowedKeyResponseMapper } from './mapper/responseBorrowedKeyMapper';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BorrowedKeyService {
  public constructor(
    @InjectRepository(BorrowedKey)
    private readonly borrowedKeyRepository: Repository<BorrowedKey>,
    private readonly keyService: KeyService,
  ) {}

  public async create(
    userDto: UserDto,
    createBorrowedKeyDto: CreateBorrowedKeyDto,
  ) {
    const key = await this.keyService.findById(createBorrowedKeyDto.keyId);

    if (!key) throw new BadRequestException('Llave no encontrada');

    if (key.isBorrowed) throw new BadRequestException('Llave ya prestada');

    const create = this.borrowedKeyRepository.create({
      ...createBorrowedKeyDto,
      key,
      user: userDto,
    });

    const borrowedKey = await this.borrowedKeyRepository.save(create);
    await this.keyService.updateBorrowed(key.keyId, true);

    return BorrowedKeyResponseMapper.toResponseBorrowedKeyDto(borrowedKey);
  }

  public async findById(borrowedKeyId: string) {
    return this.borrowedKeyRepository.findOne({
      relations: {
        user: true,
        key: true,
      },
      where: {
        borrowedKeyId,
        isOpened: true,
      },
    });
  }

  public async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const borrowedKeys = await this.borrowedKeyRepository.findAndCount({
      where: {
        isOpened: true,
      },
      relations: ['key', 'user'],
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return BorrowedKeyResponseMapper.toResponseBorrowedKeysDto(borrowedKeys);
  }

  public async history(paginationAndSearchDto: PaginationAndSearchDto) {
    const { search, limit, offset } = paginationAndSearchDto;

    const searchToLowerCase = search.toLocaleLowerCase();
    const queryRunner = this.borrowedKeyRepository.createQueryBuilder();

    const borrowedKeys = await queryRunner
      .leftJoinAndSelect('BorrowedKey.key', 'key')
      .leftJoinAndSelect('BorrowedKey.user', 'user')
      .where(
        'LOWER(key.keyName) LIKE :search  and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: false,
        },
      )
      .orWhere(
        'LOWER(BorrowedKey.borrowerName) LIKE :search and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: false,
        },
      )
      .orWhere(
        'LOWER(user.fullName) LIKE :search  and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: false,
        },
      )
      .take(limit)
      .skip(offset)
      .orderBy('BorrowedKey.updatedAt', 'DESC')
      .getManyAndCount();

    return BorrowedKeyResponseMapper.toResponseBorrowedKeysDto(borrowedKeys);
  }

  public async filter(paginationAndSearchDto: PaginationAndSearchDto) {
    const { search, limit, offset } = paginationAndSearchDto;

    const searchToLowerCase = search.toLocaleLowerCase();

    const borrowedKeys = await this.borrowedKeyRepository
      .createQueryBuilder()
      .leftJoinAndSelect('BorrowedKey.key', 'key')
      .leftJoinAndSelect('BorrowedKey.user', 'user')
      .where(
        'LOWER(key.keyName) LIKE :search  and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: true,
        },
      )
      .orWhere(
        'LOWER(BorrowedKey.borrowerName) LIKE :search and BorrowedKey.isOpened = :isOpened',
        {
          search: `%${searchToLowerCase}%`,
          isOpened: true,
        },
      )
      .take(limit)
      .skip(offset)
      .orderBy('BorrowedKey.createdAt', 'DESC')
      .getManyAndCount();

    return BorrowedKeyResponseMapper.toResponseBorrowedKeysDto(borrowedKeys);
  }

  public async close(borrowedKeyId: string, userDto: UserDto) {
    try {
      const borrowedKey = await this.findById(borrowedKeyId);

      if (!borrowedKey)
        throw new NotFoundException('Llave prestada no encontrada');

      const preload = await this.borrowedKeyRepository.preload({
        borrowedKeyId,
        isOpened: false,
        receiverName: userDto.fullName,
      });

      await this.borrowedKeyRepository.save(preload, {
        reload: true,
      });
      await this.keyService.updateBorrowed(borrowedKey.key.keyId, false);

      return { borrowedKeyId };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al cerrar la llave');
    }
  }
}
