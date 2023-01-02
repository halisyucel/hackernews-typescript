import { FieldResolver } from "nexus";

const createNewLink: FieldResolver<"Mutation", "createNewLink"> = async (
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

export default createNewLink;
