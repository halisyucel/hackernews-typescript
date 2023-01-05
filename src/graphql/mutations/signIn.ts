import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { FieldResolver } from 'nexus';
import { APP_SECRET } from '../../utils/auth';

const signIn: FieldResolver<'Mutation', 'signIn'> = async (
  _parent,
  { email, password },
  { prisma },
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

export default signIn;
