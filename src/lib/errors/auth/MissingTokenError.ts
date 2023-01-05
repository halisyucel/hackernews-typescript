import { GraphQLError } from 'graphql';

export default class MissingTokenError extends GraphQLError {
  constructor(message?: string) {
    super(message || 'No token provided', {
      extensions: {
        code: 'AUTH::MISSING_TOKEN',
      },
    });
  }
}
