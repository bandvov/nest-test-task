import { IsNotEmpty, IsUrl } from 'class-validator';
import { IsImage } from 'src/custom-validators/isImage';

export class UploadImageDto {
  // @IsNotEmpty()
  @IsUrl()
  @IsImage()
  imageUrl: string;
}
