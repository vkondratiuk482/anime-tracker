import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { SignUpRequest } from './dto/sign-up.dto';
import { SignInRequest } from './dto/sign-in.dto';

import { AuthKafkaMessages } from '../../shared/enums/auth-kafka-messages.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authService: ClientKafka,
  ) {}

  async signUp(data: SignUpRequest) {
    const tokens = await this.authService
      .send(AuthKafkaMessages.SIGN_UP, JSON.stringify(data))
      .toPromise();

    return tokens;
  }

  async signIn(data: SignInRequest) {
    const tokens = await this.authService
      .send(AuthKafkaMessages.SIGN_IN, JSON.stringify(data))
      .toPromise();

    return tokens;
  }

  async verifyToken(accessToken: string) {
    return this.authService
      .send(AuthKafkaMessages.VERIFY_TOKEN, JSON.stringify(accessToken))
      .toPromise();
  }

  async updateToken(refreshToken: string) {
    const accessToken = await this.authService
      .send(AuthKafkaMessages.UPDATE_TOKEN, JSON.stringify(refreshToken))
      .toPromise();

    return accessToken;
  }
}
