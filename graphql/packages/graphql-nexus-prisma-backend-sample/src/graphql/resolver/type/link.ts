import { FieldResolver } from 'nexus';

export const postedBy = ((parent, _args, { prisma }) => {
  return prisma.link
    .findUnique({
      where: { id: parent.id },
    })
    .postedBy();
}) as FieldResolver<'Link', 'postedBy'>;
