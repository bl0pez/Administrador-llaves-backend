import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgreDatabaseModule } from './database/postgre/postgre-database.module';
import { AuthModule } from './auth/auth.module';
import { KeyModule } from './key/key.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BorrowedKeyModule } from './borrowedKey/borrowedKey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CloudinaryModule,
    KeyModule,
    BorrowedKeyModule,
    PostgreDatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
