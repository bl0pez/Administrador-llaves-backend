import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgreDatabaseModule } from './database/postgre/postgre-database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgreDatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
