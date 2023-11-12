import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('api/v2/users')
export class UserController {
  public constructor(public readonly userService: UserService) {}

  @Get()
  @Auth(ValidRoles.ADMIN)
  public findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }
}
