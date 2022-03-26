import { Expose, Transform, Type } from 'class-transformer';

export class JikanAnime {
  @Expose()
  @Transform(({ obj }) => obj.images.jpg.image_url)
  picture: string;

  @Expose({ name: 'title_english' })
  name: string;
}

export class JikanResponse {
  @Expose()
  @Type(() => JikanAnime)
  data: JikanAnime[];
}
