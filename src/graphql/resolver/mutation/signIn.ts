import { FieldResolver } from 'nexus';
import * as yup from 'yup';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthenticationFailedError } from '../../error/AuthenticationFailedError';
import { ValidationError } from '../../error/ValidationError';
import { signInValidation } from '../../validation/signInValidation';

export const signIn: FieldResolver<'Mutation', 'signIn'> = async (
  _parent,
  args,
  { prisma },
) => {
  try {
    signInValidation.validateSync(args, { abortEarly: false });

    const user = await prisma.user.findUnique({
      where: { email: args.email },
    });

    if (!user) throw new AuthenticationFailedError();

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) throw new AuthenticationFailedError();

    const secret = process.env.APP_SECRET_KEY as string;
    const token = jwt.sign({ userId: user.id }, secret);

    return { token, user };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new ValidationError(error.errors);
    }

    throw error;
  }
};
