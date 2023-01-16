import { PrismaClient } from '@prisma/client';
import { decodeAuthHeader } from './graphql/utils/auth';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createContext = ({ req }: { req: any }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
  };
};
