import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { CONSTANTS } from '@shared/constants';

import { SignUpRequest } from '@shared/dto/auth/sign-up.dto';
import { SignInRequest } from '@shared/dto/auth/sign-in.dto';
import { TokensResponse } from '@shared/dto/auth/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authService: ClientKafka,
  ) {}

  async signUp(data: SignUpRequest): Promise<TokensResponse> {
    const tokens = await firstValueFrom(
      this.authService.send(
        CONSTANTS.KAFKA_TOPICS.AUTH.SIGN_UP,
        JSON.stringify(data),
      ),
    );

    return tokens;
  }

  async signIn(data: SignInRequest): Promise<TokensResponse> {
    const tokens = await firstValueFrom(
      this.authService.send(
        CONSTANTS.KAFKA_TOPICS.AUTH.SIGN_IN,
        JSON.stringify(data),
      ),
    );

    return tokens;
  }

  async verifyToken(accessToken: string): Promise<string> {
    const id = await firstValueFrom(
      this.authService.send(
        CONSTANTS.KAFKA_TOPICS.AUTH.VERIFY_TOKEN,
        accessToken,
      ),
    );

    return id;
  }

  async updateToken(refreshToken: string): Promise<string> {
    const accessToken = await firstValueFrom(
      this.authService.send(
        CONSTANTS.KAFKA_TOPICS.AUTH.UPDATE_TOKEN,
        refreshToken,
      ),
    );

    return accessToken;
  }
}
