import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgreDatabaseModule } from './database/postgre/postgre-database.module';
import { AuthModule } from './auth/auth.module';
import { KeyModule } from './key/key.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BorrowedKeyModule } from './borrowedKey/borrowedKey.module';
import { ServeStaticModule } from '@nestjs/serve-static';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
