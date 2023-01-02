import { extendType, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

let links: NexusGenObjects["Link"][] = [
  {
    id: "link-0",
    description: "Prisma turns your database into a GraphQL API 😎",
    url: "https://www.prismagraphql.com",
  },
  {
    id: "link-1",
    description: "The best GraphQL client",
    url: "https://www.apollographql.com/docs/react/",
  },
  {
    id: "link-2",
    description: "Hackernews is a great place to learn about GraphQL",
    url: "https://news.ycombinator.com/",
  },
];

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve: (parent, args, context, info) => {
        return links;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: (parent, args, context, info) => {
        const { description, url } = args;

        const newLink = {
          id: `link-${links.length}`,
          description,
          url,
        };

        links.push(newLink);
        return newLink;
      },
    });
  },
});
