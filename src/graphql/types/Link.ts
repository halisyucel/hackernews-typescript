import { extendType, nonNull, objectType, stringArg } from "nexus";
import createNewPost from "../mutations/createNewPost";
import getFeed from "../resolvers/getFeed";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
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
    t.nonNull.field("createNewPost", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: createNewPost,
    });
  },
});
