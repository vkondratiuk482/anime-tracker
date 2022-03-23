import {
  IsBase64,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { Status } from '../../enums/status.enum';

export class CreateAnimeRequest {
  @IsUUID()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsBase64()
  readonly picture: string;

  @IsString()
  readonly review: string;

  @IsEnum(Status)
  readonly status: Status;

  @IsDate()
  readonly startDate: string;

  @IsOptional()
  @IsDate()
  readonly endDate: string;
}
