import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { Status } from '../../enums/status.enum';

export class CreateAnimeRequest {
  @IsUUID()
  @IsOptional()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly picture: string;

  @IsString()
  readonly review: string;

  @IsEnum(Status)
  readonly status: Status;
}
