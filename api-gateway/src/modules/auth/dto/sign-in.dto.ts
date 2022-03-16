import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
