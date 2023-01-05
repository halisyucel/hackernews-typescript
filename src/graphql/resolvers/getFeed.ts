import { FieldResolver } from 'nexus';

const getFeed: FieldResolver<'Query', 'getFeed'> = (_parent, _args, { prisma }) => {
  return prisma.link.findMany();
};

export default getFeed;
