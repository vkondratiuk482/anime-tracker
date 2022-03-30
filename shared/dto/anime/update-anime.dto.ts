import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';

export class UpdateAnimeRequest extends PartialType(
  OmitType(CreateAnimeRequest, ['userId'] as const),
) {
  @ApiProperty()
  @IsUUID()
  id: string;
}
