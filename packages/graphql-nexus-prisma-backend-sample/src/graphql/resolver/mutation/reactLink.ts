import { FieldResolver } from 'nexus';
import { LinkNotFound } from '../../error/LinkNotFound';

export const reactLink = ((_parent, args, { prisma, userId }) => {
  const { id, reaction } = args;

  const link = prisma.link.findUnique({
    where: { id },
  });

  if (!link) throw new LinkNotFound();

  return prisma.link.update({
    where: { id },
    data: {
      reactions: {
        create: {
          type: reaction,
          userId,
        },
      },
    },
  });
}) as FieldResolver<'Mutation', 'reactLink'>;
