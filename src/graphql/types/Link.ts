import { extendType, nonNull, nullable, objectType, stringArg } from "nexus";
import getFeed from "../resolvers/getFeed";
import getPostedBy from "../resolvers/getPostedBy";
import createNewLink from "../mutations/createNewLink";
import updateLink from "../mutations/updateLink";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
    t.field("postedBy", {
      type: "User",
      resolve: getPostedBy,
    });
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getFeed", {
      type: "Link",
      resolve: getFeed,
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createNewLink", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: createNewLink,
    });
    t.nonNull.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(stringArg()),
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
        postedById: stringArg(),
      },
      resolve: updateLink,
    });
  },
});
