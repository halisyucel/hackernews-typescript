import { objectType } from 'nexus';
import { Reactable } from './Reactable';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('text');
    t.nonNull.field('user', { type: 'User' });
    t.nonNull.field('link', { type: 'Link' });
    t.implements(Reactable);
  },
});
