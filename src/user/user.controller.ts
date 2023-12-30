import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { UserService } from './user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto, UpdateUserDto, UserDto, UsersAndCountDto } from './dto';
import { PaginationAndSearchDto } from 'src/common/dto/PaginationAndSearch.dto';
import { Roles } from '@/utils/roles';

@ApiTags('users')
@ApiBearerAuth()
@Controller('api/v2/users')
export class UserController {
  public constructor(public readonly userService: UserService) {}

  @Get()
  @Auth(Roles.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersAndCountDto,
  })
  public findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<UsersAndCountDto> {
    return this.userService.findAll(paginationDto);
  }

  @Get('search')
  @Auth(Roles.ADMIN)
  public search(@Query() paginationAndSearchDto: PaginationAndSearchDto) {
    return this.userService.search(paginationAndSearchDto);
  }

  @Post()
  @Auth(Roles.ADMIN)
  public create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @Auth(Roles.ADMIN)
  public update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(Roles.ADMIN)
  public delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
