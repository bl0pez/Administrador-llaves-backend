import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidRoles } from 'src/auth/interfaces';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número',
  })
  password: string;

  @ApiProperty()
  @IsString({ each: true })
  @Matches(/^(admin|operador)$/, {
    each: true,
    message: `Los roles válidos son ${ValidRoles.ADMIN} y ${ValidRoles.USER}`,
  })
  roles: string[];
}
