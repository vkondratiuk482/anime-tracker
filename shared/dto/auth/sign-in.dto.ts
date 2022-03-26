import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
