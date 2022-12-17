import { UploadImageDto } from './../dto/image.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  sendHello(imageUrl: UploadImageDto) {
    return 'hello1';
  }
}
