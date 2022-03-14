import { IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
