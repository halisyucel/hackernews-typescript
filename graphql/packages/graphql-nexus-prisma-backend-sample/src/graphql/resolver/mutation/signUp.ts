import { FieldResolver } from 'nexus';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { signUpValidation } from '../../validation/signUpValidation';
import { ValidationError } from '../../error/ValidationError';

export const signUp: FieldResolver<'Mutation', 'signUp'> = async (
  _parent,
  args,
  { prisma },
) => {
  try {
    signUpValidation.validateSync(args, { abortEarly: false });

    const { name, email } = args;
    const password = await bcrypt.hash(args.password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

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
