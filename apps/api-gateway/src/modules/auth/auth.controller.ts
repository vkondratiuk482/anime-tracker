import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Request, Response } from 'express';

import { CONSTANTS } from '@shared/constants';

import { SignUpRequest } from '@shared/dto/auth/sign-up.dto';
import { SignInRequest } from '@shared/dto/auth/sign-in.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authClient: ClientKafka,
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    for (const topic in CONSTANTS.KAFKA_TOPICS.AUTH) {
      this.authClient.subscribeToResponseOf(CONSTANTS.KAFKA_TOPICS.AUTH[topic]);
    }
  }

  @Post('signUp')
  async signUp(
    @Body() data: SignUpRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signUp(data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('signIn')
  async signIn(
    @Body() data: SignInRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('update')
  async updateToken(@Req() req: Request) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) throw new BadRequestException('No refreshToken');

    const accessToken = await this.authService.updateToken(refreshToken);

    return accessToken;
  }
}
