import { TokenGuard } from './../guards/tokenGuard';
import { UploadImageDto } from './../dto/image.dto';
import { ImageService } from './image.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  test(@Body() imageUrl: UploadImageDto) {
    return this.imageService.sendHello(imageUrl);
  }
}
