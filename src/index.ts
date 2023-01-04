import { context } from "./context";
import { schema } from "./schema";
import "./setup";
import { ApolloServer } from "apollo-server";

export const server = new ApolloServer({
	schema,
	context,
});

const port = 3000;

server.listen({ port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
