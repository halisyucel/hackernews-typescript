import { FieldResolver } from 'nexus';

const getPostedBy: FieldResolver<'Link', 'postedBy'> = (
  { id },
  _args,
  { prisma },
) => {
  return prisma.link.findUnique({ where: { id } }).postedBy();
};

export default getPostedBy;
