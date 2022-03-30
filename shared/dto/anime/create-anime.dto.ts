import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString } from 'class-validator';

import { Status } from '../../enums/status.enum';

export class CreateAnimeRequest {
  readonly userId?: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly picture: string;

  @ApiProperty()
  @IsString()
  readonly review: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  readonly status: Status;
}
