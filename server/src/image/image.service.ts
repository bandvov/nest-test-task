import { Image, ImageDocument } from './../schemas/image.schema';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}
  async uploadImage(imageUrl: string) {
    const fileName = imageUrl.match(/[\w-]+.(jpg|png|svg)/g)[0];
    const writer = fs.createWriteStream(
      path.join(process.cwd(), 'uploads', fileName),
    );

    const streamResponse = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream',
    });

    streamResponse.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log('Finished');
        this.imageModel
          .create({ name: fileName })
          .then(() => {
            resolve('Image uploaded');
          })
          .catch((e) => {
            console.log(e);
            if (e?.message.includes('E1100')) {
              reject(new HttpException('Image already added', 400));
            }
            reject(new InternalServerErrorException());
          });
      });
      writer.on('error', () => {
        console.log('error');
        reject(new InternalServerErrorException());
      });
    });
  }
  async getAllImages() {
    return this.imageModel.find().exec();
  }
}
