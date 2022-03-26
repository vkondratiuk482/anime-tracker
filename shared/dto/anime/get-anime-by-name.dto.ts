import { IsString } from 'class-validator';

export class GetAnimeByNameRequest {
  @IsString()
  name: string;
}
