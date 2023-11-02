import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Key } from '../entities/key.entity';
import { User } from 'src/auth/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateKeyDto } from '../dto';
import { KeyResponseMapper } from '../mapper/KeyResponseMapper';
import { ResponseKeyDto } from '../dto/response-key.dto';

@Injectable()
export class CreateKeyService {
  public constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async run(
    user: User,
    createKeyDto: CreateKeyDto,
    file: Express.Multer.File,
  ): Promise<ResponseKeyDto> {
    if (!file) throw new BadRequestException('No se ha encontrado el archivo');
    const data = this.keyRepository.create({
      ...createKeyDto,
      user,
      image: file.filename,
    });

    const key = await this.keyRepository.save(data);

    return KeyResponseMapper.toResponseKeyDto(key);
  }
}
