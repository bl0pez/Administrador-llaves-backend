import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { Repository } from 'typeorm';
import { CreateKeyDto } from './dto/create-key.dto';
import { User } from 'src/auth/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class KeyService {
  private readonly logger = new Logger(KeyService.name);

  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async create(
    user: User,
    createKeyDto: CreateKeyDto,
    file: Express.Multer.File,
  ) {
    try {
      const { fullName } = user;

      const { secure_url } = await this.cloudinaryService.uploadFile(file);

      const key = this.keyRepository.create({
        ...createKeyDto,
        createBy: user,
        image: secure_url,
      });

      await this.keyRepository.save(key);

      return {
        ...key,
        createBy: fullName,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  public async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, search } = paginationDto;

    try {
      const queryBuilder = this.keyRepository.createQueryBuilder();

      const keys = await queryBuilder
        .leftJoinAndSelect('Key.createBy', 'createBy')
        .where('LOWER(Key.keyName) LIKE :search', {
          search: search ? `%${search}%` : '%%',
        })
        .orWhere('LOWER(createBy.fullName) LIKE :search', {
          search: search ? `%${search}%` : '%%',
        })
        .take(limit)
        .skip(offset)
        .orderBy('Key.createdAt', 'DESC')
        .getManyAndCount();

      return {
        keys: keys[0].map((key) => ({
          ...key,
          createBy: key.createBy.fullName,
        })),
        count: keys[1],
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  public async findAvailableKeys() {
    return await this.keyRepository.find({
      where: { isBorrowed: false },
      select: ['keyId', 'keyName'],
    });
  }

  public async validateKeyAvailability(keyId: string) {
    const key = await this.keyRepository.findOne({
      where: { keyId },
    });

    if (!key) throw new BadRequestException('Llave no encontrada');

    if (key.isBorrowed)
      throw new BadRequestException('La llave no está disponible');

    return {
      keyId: key.keyId,
      keyName: key.keyName,
    };
  }

  public async updateKeyIsBorrowed(keyId: string, isBorrowed: boolean) {
    return await this.keyRepository.update({ keyId }, { isBorrowed });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
