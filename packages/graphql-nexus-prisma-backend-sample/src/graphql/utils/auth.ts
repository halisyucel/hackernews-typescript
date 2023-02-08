import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { AuthenticationFailedError } from '../error/AuthenticationFailedError';
import { NoTokenProvidedError } from '../error/NoTokenProvidedError';

export interface AuthHeaderPayload {
  userId: string;
}

export const decodeAuthHeader = (
  authHeader: string,
  prisma: PrismaClient,
): AuthHeaderPayload => {
  const secret = process.env.APP_SECRET_KEY as string;

  const token = authHeader.replace('Bearer ', '');
  if (token.trim() === '') throw new NoTokenProvidedError();

  const payload = jwt.verify(token, secret) as AuthHeaderPayload;

  const user = prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) throw new AuthenticationFailedError();

  return payload;
};
