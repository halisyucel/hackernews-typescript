import * as jwt from 'jsonwebtoken';
import InvalidTokenError from '../lib/errors/auth/InvalidTokenError';
import MissingTokenError from '../lib/errors/auth/MissingTokenError';
import UnknownError from '../lib/errors/common/UnknownError';

export interface AuthTokenPayload {
  userId: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new MissingTokenError();
  }

  try {
    return jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as AuthTokenPayload;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new InvalidTokenError();
    }
    throw new UnknownError();
  }
}
