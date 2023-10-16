import { ApiProperty } from '@nestjs/swagger';
import { ValidRoles } from '../interfaces';

export class UserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Fecha de actualización del usuario',
    example: '2021-01-01T00:00:00.000Z',
  })
  updated_at: Date | null;

  @ApiProperty({
    description: 'Fecha de eliminación del usuario',
    example: null,
  })
  deleted_at: Date | null;

  @ApiProperty({
    description: 'ID del usuario',
    example: '87b28d4e-39d2-4c9f-938a-8a4a0c95fd16',
  })
  id: string;

  @ApiProperty({
    description: 'Roles del usuario',
    example: [ValidRoles.USER],
  })
  roles: string[];

  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2021-01-01T00:00:00.000Z',
  })
  created_at: Date;
}

export class ResponseUserDto {
  @ApiProperty({
    description: 'Datos del usuario',
  })
  user: UserDto;

  @ApiProperty({
    description: 'Token de autenticación',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  token: string;
}
