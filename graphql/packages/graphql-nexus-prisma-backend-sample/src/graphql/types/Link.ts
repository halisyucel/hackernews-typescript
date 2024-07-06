import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { createLink } from '../resolver/mutation/createLink';
import { deleteLink } from '../resolver/mutation/deleteLink';
import { reactLink } from '../resolver/mutation/reactLink';
import { getFeed } from '../resolver/query/getFeed';
import { postedBy } from '../resolver/type/link';
import { Reactable } from './Reactable';
import { ReactionType } from './Reaction';

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
    t.implements(Reactable);
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
    t.nonNull.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: deleteLink,
    });
    t.nonNull.field('reactLink', {
      type: 'Link',
      args: {
        id: nonNull(stringArg()),
        reaction: nonNull(ReactionType),
      },
      resolve: reactLink,
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
