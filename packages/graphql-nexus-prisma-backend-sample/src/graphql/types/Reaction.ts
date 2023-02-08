import { enumType, objectType } from 'nexus';

export const ReactionType = enumType({
  name: 'ReactionType',
  members: ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'],
});

export const Reaction = objectType({
  name: 'Reaction',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('type', { type: ReactionType });
    t.nonNull.field('user', { type: 'User' });
    t.field('link', { type: 'Link' });
    t.field('comment', { type: 'Comment' });
  },
});
