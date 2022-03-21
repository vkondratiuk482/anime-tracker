import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { Prisma } from '@prisma/client';

import { SignInRequest } from './dto/sign-in.dto';
import { KafkaMessages } from './enums/kafka-messages.enum';

import { ParseMessagePipe } from '../../shared/pipes/parse-message.pipe';
import { ExceptionFilter } from '../../shared/filters/exception.filter';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(KafkaMessages.SIGN_UP)
  async signUp(@Payload(new ParseMessagePipe()) data: Prisma.UserCreateInput) {
    return this.authService.signUp(data);
  }

  @MessagePattern(KafkaMessages.SIGN_IN)
  async signIn(@Payload(new ParseMessagePipe()) data: SignInRequest) {
    return this.authService.signIn(data);
  }

  @MessagePattern(KafkaMessages.VERIFY_TOKEN)
  async verifyToken(@Payload(new ParseMessagePipe()) accessToken: string) {
    return this.authService.verifyAccessToken(accessToken);
  }

  @MessagePattern(KafkaMessages.UPDATE_TOKEN)
  async updateToken(@Payload(new ParseMessagePipe()) refreshToken: string) {
    return this.authService.updateAccessToken(refreshToken);
  }
}