import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { KeyService } from './key.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateKeyDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { fileName } from './helper/fileName.helper';

@ApiTags('Llaves')
@ApiBearerAuth()
@Controller('api/v2/keys')
@Auth()
export class KeyController {
  public constructor(private readonly keyService: KeyService) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createKeyDto: CreateKeyDto,
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.keyService.create(user, createKeyDto, file);
  }

  @Get()
  public async getAllKeys() {
    return this.keyService.getAllKeys();
  }

  @Get('available')
  public async getAvailableKeys() {
    return this.keyService.findAvailableKeys();
  }
}
