import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UsersAndCountDto } from './dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('api/v2/users')
export class UserController {
  public constructor(public readonly userService: UserService) {}

  @Get()
  @Auth(ValidRoles.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersAndCountDto,
  })
  public findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<UsersAndCountDto> {
    return this.userService.findAll(paginationDto);
  }
}
