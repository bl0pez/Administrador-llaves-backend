import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
@Module({
  imports: [TypeOrmModule.forFeature([Key])],
  controllers: [KeyController],
  providers: [KeyService],
  exports: [KeyService],
})
export class KeyModule {}
