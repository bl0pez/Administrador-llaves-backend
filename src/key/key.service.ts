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

  public async getAllKeys() {
    try {
      const keys = await this.keyRepository.findAndCount({
        relations: ['createBy'],
      });

      return {
        keys: keys[0].map((key) => ({
          ...key,
          createBy: key.createBy.fullName,
        })),
        count: keys[1],
      };

      return keys;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
