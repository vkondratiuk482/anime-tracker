import { OmitType } from '@nestjs/mapped-types';

import { IsUUID } from 'class-validator';

import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';

export class UpdateAnimeRequest extends OmitType(CreateAnimeRequest, [
  'userId',
  'startDate',
] as const) {
  @IsUUID()
  id: string;
}
