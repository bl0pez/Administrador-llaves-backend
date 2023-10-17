import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Key]), AuthModule, CloudinaryModule],
  controllers: [KeyController],
  providers: [KeyService],
})
export class KeyModule {}
