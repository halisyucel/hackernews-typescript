import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { FieldResolver } from 'nexus';
import InvalidCredentialsError from '../../lib/errors/auth/InvalidCredentials';
import { AuthTokenPayload } from '../../utils/auth';

const signIn: FieldResolver<'Mutation', 'signIn'> = async (
  _parent,
  { email, password },
  { prisma },
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign(
    { userId: user.id } as AuthTokenPayload,
    process.env.APP_SECRET as string,
  );

  return {
    token,
    user,
  };
};

export default signIn;
