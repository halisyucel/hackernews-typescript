import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { createLink } from '../resolver/mutation/createLink';
import { getFeed } from '../resolver/query/getFeed';
import { postedBy } from '../resolver/type/link';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('url');
    t.nonNull.string('description');
    t.nonNull.field('postedBy', {
      type: 'User',
      resolve: postedBy,
    });
  },
});

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createLink', {
      type: 'Link',
      args: {
        url: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      resolve: createLink,
    });
  },
});

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getFeed', {
      type: 'Link',
      resolve: getFeed,
    });
  },
});
