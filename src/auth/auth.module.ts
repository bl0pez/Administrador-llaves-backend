import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class AuthModule {}
