import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcryptjs';

import { SignUpRequest } from '@shared/dto/auth/sign-up.dto';
import { SignInRequest } from '@shared/dto/auth/sign-in.dto';
import { TokensResponse } from '@shared/dto/auth/tokens.dto';

import { User } from '@shared/entities/auth/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(data: SignUpRequest): Promise<TokensResponse> {
    const candidate = await this.userService.findOneByEmail(data.email);

    if (candidate) throw new RpcException('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 7);
    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user.id);

    return tokens;
  }

  async signIn(data: SignInRequest): Promise<TokensResponse> {
    const user = await this.verifyUser(data.email, data.password);

    const tokens = this.generateTokens(user.id);

    return tokens;
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new RpcException('User does not exist');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new RpcException('Incorrect password');

    return user;
  }

  async updateAccessToken(refreshToken: string): Promise<string> {
    const userId = this.verifyRefreshToken(refreshToken);

    const tokens = this.generateTokens(userId);

    return tokens.accessToken;
  }

  async verifyAccessToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      const userExists = await this.userService.findOne(payload.id);

      return payload.id;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  private verifyRefreshToken(refreshToken: string): string {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return payload.id;
  }

  private generateTokens(id: string): TokensResponse {
    const payload = { id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
    });

    const tokens = { accessToken, refreshToken };

    return tokens;
  }
}
