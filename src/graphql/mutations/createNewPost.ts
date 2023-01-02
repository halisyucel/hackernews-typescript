import { FieldResolver } from "nexus";

const createNewPost: FieldResolver<"Mutation", "createNewPost"> = async (
  _parent,
  { description, url },
  { prisma }
) => {
  return prisma.link.create({
    data: {
      description,
      url,
    },
  });
};

export default createNewPost;
