import { FieldResolver } from 'nexus';

export const links = ((parent, _args, { prisma }) => {
  return prisma.user
    .findUnique({
      where: { id: parent.id },
    })
    .links();
}) as FieldResolver<'User', 'links'>;
