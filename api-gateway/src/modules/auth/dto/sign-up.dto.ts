import { IsString } from 'class-validator';

export class SignUpRequest {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
