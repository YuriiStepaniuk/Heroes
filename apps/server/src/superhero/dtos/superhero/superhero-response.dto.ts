import { Expose, Type } from 'class-transformer';
import { ImageResponseDto } from '../image/image-response.dto';

export class SuperheroResponseDto {
  @Expose()
  id: number;

  @Expose()
  nickname: string;

  @Expose()
  realName: string;

  @Expose()
  originDescription: string;

  @Expose()
  superpowers: string[];

  @Expose()
  catchPhrase: string;

  @Expose()
  @Type(() => ImageResponseDto)
  images: ImageResponseDto[];
}
