import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { KafkaTopics } from '@shared/constants/kafka-topics';

import { SignUpRequest } from '@shared/dto/sign-up.dto';
import { SignInRequest } from '@shared/dto/sign-in.dto';
import { TokensResponse } from '@shared/dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authService: ClientKafka,
  ) {}

  async signUp(data: SignUpRequest): Promise<TokensResponse> {
    const tokens = await firstValueFrom(
      this.authService.send(KafkaTopics.AUTH.SIGN_UP, JSON.stringify(data)),
    );

    return tokens;
  }

  async signIn(data: SignInRequest): Promise<TokensResponse> {
    const tokens = await firstValueFrom(
      this.authService.send(KafkaTopics.AUTH.SIGN_IN, JSON.stringify(data)),
    );

    return tokens;
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    return firstValueFrom(
      this.authService.send(KafkaTopics.AUTH.VERIFY_TOKEN, accessToken),
    );
  }

  async updateToken(refreshToken: string): Promise<string> {
    const accessToken = await firstValueFrom(
      this.authService.send(KafkaTopics.AUTH.UPDATE_TOKEN, refreshToken),
    );

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
