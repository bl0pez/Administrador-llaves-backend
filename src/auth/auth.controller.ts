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
import { CreateUserDto, LoginUserDto, ResponseUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado exitosamente.',
    type: ResponseUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'El usuario ha sido autenticado exitosamente.',
    type: ResponseUserDto,
  })
  @HttpCode(HttpStatus.OK)
  public loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ResponseUserDto> {
    return this.authService.login(loginUserDto);
  }

  @Get('checkAuthStatus')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'El usuario ha sido autenticado exitosamente.',
    type: ResponseUserDto,
  })
  @Auth()
  checkAuthStatus(@GetUser() user: User): Promise<ResponseUserDto> {
    return this.authService.checkAuthStatus(user);
  }
}
