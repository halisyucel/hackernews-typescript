import { extendType, nonNull, objectType, stringArg } from 'nexus';
import createLink from '../mutations/createLink';
import updateLink from '../mutations/updateLink';
import getFeed from '../resolvers/getFeed';
import getPostedBy from '../resolvers/getPostedBy';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
    t.field('postedBy', {
      type: 'User',
      resolve: getPostedBy,
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

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createLink', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: createLink,
    });
    t.nonNull.field('updateLink', {
      type: 'Link',
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
