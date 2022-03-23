import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpRequest {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
