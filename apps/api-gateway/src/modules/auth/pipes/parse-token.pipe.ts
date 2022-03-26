import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { parseAuthorizationHeaders } from '../utils/parse-auth-headers';

import { AuthService } from '../auth.service';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    const token = await parseAuthorizationHeaders(value);

    const id = await this.authService.verifyToken(token);

    return id;
  }
}
