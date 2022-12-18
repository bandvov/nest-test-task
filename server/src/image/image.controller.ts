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

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async test(@Body() body: UploadImageDto) {
    return this.imageService.uploadImage(body.imageUrl);
  }
  @Get()
  @UseGuards(TokenGuard)
  async getAllImages() {
    return this.imageService.getAllImages();
  }
}
