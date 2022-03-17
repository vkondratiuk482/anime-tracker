import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { SignUpRequest } from './dto/sign-up.dto';
import { SignInRequest } from './dto/sign-in.dto';
import { TokensResponse } from './dto/tokens.dto';

import { AuthKafkaMessages } from './enums/auth-kafka-messages.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authService: ClientKafka,
  ) {}

  async signUp(data: SignUpRequest): Promise<TokensResponse> {
    const tokens = await this.authService
      .send(AuthKafkaMessages.SIGN_UP, JSON.stringify(data))
      .toPromise();

    return tokens;
  }

  async signIn(data: SignInRequest): Promise<TokensResponse> {
    const tokens = await this.authService
      .send(AuthKafkaMessages.SIGN_IN, JSON.stringify(data))
      .toPromise();

    return tokens;
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    return this.authService
      .send(AuthKafkaMessages.VERIFY_TOKEN, JSON.stringify(accessToken))
      .toPromise();
  }

  async updateToken(refreshToken: string): Promise<string> {
    const accessToken = await this.authService
      .send(AuthKafkaMessages.UPDATE_TOKEN, JSON.stringify(refreshToken))
      .toPromise();

    return accessToken;
  }

  async parseAuthorizationHeaders(authHeaders: string): Promise<string> {
    const tokenType = authHeaders.split(' ')[0];
    const token = authHeaders.split(' ')[1];

    if (!token || tokenType !== 'Bearer') {
      throw new UnauthorizedException('Incorrect auth headers');
    }

    return token;
  }
}
