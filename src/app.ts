import './setup';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { schema } from './schema';
import { Context, createContext } from './context';

const server = new ApolloServer<Context>({
  schema,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => createContext({ req }),
    listen: {
      port: 3000,
    },
  });

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
})();
