import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { schema } from './schema';
import './setup';

export const server = new ApolloServer({
  schema,
  context,
});

const port = 3000;

server.listen({ port }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
