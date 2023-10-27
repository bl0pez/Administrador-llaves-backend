import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { KeyController } from './key.controller';
import {
  CreateKeyService,
  FindAllKeysService,
  FindKeyByIdService,
  KeyAvailabilityService,
  KeyFilterService,
  ToggleKeyStateService,
} from './services';
@Module({
  imports: [TypeOrmModule.forFeature([Key]), CloudinaryModule],
  controllers: [KeyController],
  providers: [
    CreateKeyService,
    FindAllKeysService,
    FindKeyByIdService,
    KeyAvailabilityService,
    KeyFilterService,
    ToggleKeyStateService,
  ],
  exports: [FindKeyByIdService, ToggleKeyStateService],
})
export class KeyModule {}
