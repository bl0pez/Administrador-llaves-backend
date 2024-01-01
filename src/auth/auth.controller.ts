import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, AuthDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // @ApiResponse({
  //   status: 201,
  //   description: 'El usuario ha sido creado exitosamente.',
  //   type: AuthDto,
  // })
  // create(@Body() createUserDto: CreateUserDto): Promise<AuthDto> {
  //   return this.authService.create(createUserDto);
  // }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'El usuario ha sido autenticado exitosamente.',
    type: AuthDto,
  })
  @HttpCode(HttpStatus.OK)
  public loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthDto> {
    return this.authService.login(loginUserDto);
  }

  @Get('checkAuthStatus')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'El usuario ha sido autenticado exitosamente.',
    type: AuthDto,
  })
  @Auth()
  checkAuthStatus(@GetUser() user: User): Promise<AuthDto> {
    return this.authService.checkAuthStatus(user);
  }
}
