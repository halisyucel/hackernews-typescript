import { objectType } from 'nexus';
import { links } from '../resolver/type/user';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.list.nonNull.field('links', {
      type: 'Link',
      resolve: links,
    });
  },
});
