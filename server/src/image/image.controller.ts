import { TokenGuard } from './../guards/tokenGuard';
import { UploadImageDto } from './../dto/image.dto';
import { ImageService } from './image.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post('add')
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async test(@Body() body: UploadImageDto) {
    return this.imageService.uploadImage(body.imageUrl);
  }
  @Post()
  @UseGuards(TokenGuard)
  async getAllImages() {
    return this.imageService.getAllImages();
  }
}
