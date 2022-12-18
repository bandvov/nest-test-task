import { TokenGuard } from './../guards/tokenGuard';
import { UploadImageDto } from './../dto/image.dto';
import { ImageService } from './image.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async test(@Body() body: UploadImageDto) {
    const fileName = body.imageUrl.match(/[\w-]+.(jpg|png|svg)/g)[0];
    const writer = fs.createWriteStream(
      path.join(process.cwd(), 'uploads', fileName),
    );

    const streamResponse = await axios({
      url: body.imageUrl,
      method: 'GET',
      responseType: 'stream',
    });

    streamResponse.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log('Finished');
        resolve('Image uploaded');
      });
      writer.on('error', () => {
        console.log('Finished');
        reject(new InternalServerErrorException());
      });
    });

    // return this.imageService.sendHello(imageUrl);
  }
}
