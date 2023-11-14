import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowedKey } from '../entities/borroweKey.entity';
import { Repository } from 'typeorm';
import { CreateBorrowedKeyDto } from '../dto/create-borrowedKey.dto';
import { FindKeyByIdService, ToggleKeyStateService } from 'src/key/services';
import { BorrwoedKeyResponseMapper } from '../mapper/responseBorrowedKeyMapper';
import { UserDto } from 'src/user/dto';

@Injectable()
export class CreateBorrowedKeyService {
  public constructor(
    @InjectRepository(BorrowedKey)
    private readonly borrowedKeyRepository: Repository<BorrowedKey>,
    private readonly toggleKeyService: ToggleKeyStateService,
    private readonly findKeyByIdService: FindKeyByIdService,
  ) {}

  public async run(user: UserDto, createBorrowedKeyDto: CreateBorrowedKeyDto) {
    const key = await this.findKeyByIdService.run(createBorrowedKeyDto.keyId);

    if (!key) throw new BadRequestException('Key not found');

    if (key.isBorrowed) throw new BadRequestException('Key already borrowed');

    const createBorrowedKey = this.borrowedKeyRepository.create({
      ...createBorrowedKeyDto,
      key,
      user,
    });

    const borrowedKey =
      await this.borrowedKeyRepository.save(createBorrowedKey);
    await this.toggleKeyService.run(key.keyId, true);

    return BorrwoedKeyResponseMapper.toResponseBorrowedKeyDto(borrowedKey);
  }
}
