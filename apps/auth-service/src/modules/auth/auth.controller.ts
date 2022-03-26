import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { KafkaTopics } from '@shared/constants/kafka-topics';
import { SignUpRequest } from '@shared/dto/auth/sign-up.dto';
import { SignInRequest } from '@shared/dto/auth/sign-in.dto';

import { ParseMessagePipe } from '@shared/pipes/parse-message.pipe';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(KafkaTopics.AUTH.SIGN_UP)
  async signUp(@Payload(new ParseMessagePipe()) data: SignUpRequest) {
    return this.authService.signUp(data);
  }

  @MessagePattern(KafkaTopics.AUTH.SIGN_IN)
  async signIn(@Payload(new ParseMessagePipe()) data: SignInRequest) {
    return this.authService.signIn(data);
  }

  @MessagePattern(KafkaTopics.AUTH.VERIFY_TOKEN)
  async verifyToken(@Payload(new ParseMessagePipe()) accessToken: string) {
    return this.authService.verifyAccessToken(accessToken);
  }

  @MessagePattern(KafkaTopics.AUTH.UPDATE_TOKEN)
  async updateToken(@Payload(new ParseMessagePipe()) refreshToken: string) {
    return this.authService.updateAccessToken(refreshToken);
  }
}
