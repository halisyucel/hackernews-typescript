import { interfaceType } from 'nexus';

export const Reactable = interfaceType({
  name: 'Reactable',
  definition(t) {
    t.nonNull.list.field('reactions', { type: 'Reaction' });
  },
});
