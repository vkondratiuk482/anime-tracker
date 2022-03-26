import { UnauthorizedException } from '@nestjs/common';

export const parseAuthorizationHeaders = async (
  authHeaders: string,
): Promise<string> => {
  const tokenType = authHeaders.split(' ')[0];
  const token = authHeaders.split(' ')[1];

  if (!token || tokenType !== 'Bearer') {
    throw new UnauthorizedException('Incorrect auth headers');
  }

  return token;
};
