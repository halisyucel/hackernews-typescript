import { FieldResolver } from 'nexus';

export const getFeed: FieldResolver<'Query', 'getFeed'> = (
  _parent,
  _arg,
  { prisma },
) => {
  return prisma.link.findMany();
};
