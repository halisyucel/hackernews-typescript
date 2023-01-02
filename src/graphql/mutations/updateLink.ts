import { FieldResolver } from "nexus";

const updateLink: FieldResolver<"Mutation", "updateLink"> = (
  _parent,
  { id, description, url, postedById },
  context
) => {
  return context.prisma.link.update({
    where: { id },
    data: {
      description,
      url,
      postedBy: {
        connect: { id: postedById ? postedById : undefined },
      },
    },
  });
};

export default updateLink;
