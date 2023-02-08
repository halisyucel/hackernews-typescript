import { objectType } from 'nexus';

export const Save = objectType({
  name: 'Save',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('user', { type: 'User' });
    t.nonNull.field('link', { type: 'Link' });
  },
});
