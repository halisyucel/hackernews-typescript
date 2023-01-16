import * as jwt from 'jsonwebtoken';
import { NoTokenProvidedError } from '../error/NoTokenProvidedError';

export interface AuthHeaderPayload {
  userId: string;
}

export const decodeAuthHeader = (authHeader: string): AuthHeaderPayload => {
  const secret = process.env.APP_SECRET_KEY as string;

  const token = authHeader.replace('Bearer ', '');
  if (token.trim() === '') throw new NoTokenProvidedError();

  return jwt.verify(token, secret) as AuthHeaderPayload;
};
