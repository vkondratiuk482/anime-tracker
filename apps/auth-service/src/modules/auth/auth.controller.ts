import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CONSTANTS } from '@shared/constants';

import { SignUpRequest } from '@shared/dto/auth/sign-up.dto';
import { SignInRequest } from '@shared/dto/auth/sign-in.dto';

import { ParseMessagePipe } from '@shared/pipes/parse-message.pipe';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.AUTH.SIGN_UP)
  async signUp(@Payload(new ParseMessagePipe()) data: SignUpRequest) {
    return this.authService.signUp(data);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.AUTH.SIGN_IN)
  async signIn(@Payload(new ParseMessagePipe()) data: SignInRequest) {
    return this.authService.signIn(data);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.AUTH.VERIFY_TOKEN)
  async verifyToken(@Payload(new ParseMessagePipe()) accessToken: string) {
    return this.authService.verifyAccessToken(accessToken);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.AUTH.UPDATE_TOKEN)
  async updateToken(@Payload(new ParseMessagePipe()) refreshToken: string) {
    return this.authService.updateAccessToken(refreshToken);
  }
}
