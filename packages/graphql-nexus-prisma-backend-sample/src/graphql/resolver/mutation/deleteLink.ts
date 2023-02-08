import { FieldResolver } from 'nexus';
import * as yup from 'yup';
import { AuthenticationFailedError } from '../../error/AuthenticationFailedError';
import { LinkNotFound } from '../../error/LinkNotFound';
import { ValidationError } from '../../error/ValidationError';
import { deleteLinkValidation } from '../../validation/deleteLinkValidation';

export const deleteLink: FieldResolver<'Mutation', 'deleteLink'> = (
  _parent,
  args,
  { prisma, userId },
) => {
  if (!userId) throw new AuthenticationFailedError();

  try {
    deleteLinkValidation.validateSync(args, { abortEarly: false });

    const link = prisma.link.findUnique({
      where: { id: args.id },
    });

    if (!link) throw new LinkNotFound();

    return prisma.link.delete({
      where: { id: args.id },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError)
      throw new ValidationError(error.errors);

    throw error;
  }
};
