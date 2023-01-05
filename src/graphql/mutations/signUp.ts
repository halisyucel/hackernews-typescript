import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { FieldResolver } from 'nexus';
import EmailAlreadyTakenError from '../../lib/errors/auth/EmailAlreadyTaken';
import { AuthTokenPayload } from '../../utils/auth';

// TODO: add yup validation

const signUp: FieldResolver<'Mutation', 'signUp'> = async (
  _parent,
  { email, name, password },
  { prisma },
) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const isEmailTaken = await prisma.user.findUnique({
    where: { email },
  });

  if (isEmailTaken) {
    throw new EmailAlreadyTakenError();
  }

  const user = await prisma.user.create({
    data: { email, name, password: passwordHash },
  });

  const token = jwt.sign(
    { userId: user.id } as AuthTokenPayload,
    process.env.APP_SECRET as string,
  );

  return {
    token,
    user,
  };
};

export default signUp;
