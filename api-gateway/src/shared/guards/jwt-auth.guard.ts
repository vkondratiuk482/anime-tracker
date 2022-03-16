import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    try {
      const token = await this.authService.parseAuthorizationHeaders(
        req.headers.authorization,
      );

      return this.authService.verifyToken(token);
    } catch (e) {
      console.log(e);
    }
  }
}
