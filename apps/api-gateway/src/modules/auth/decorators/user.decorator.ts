import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { ParseTokenPipe } from '../pipes/parse-token.pipe';

const GetToken = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<Request>().headers.authorization;
});

export const User = () => GetToken(ParseTokenPipe);
