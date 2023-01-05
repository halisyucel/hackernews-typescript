import { GraphQLError } from 'graphql';

export default class InvalidTokenError extends GraphQLError {
  constructor(message?: string) {
    super(message || 'The provided token is invalid', {
      extensions: {
        code: 'AUTH::INVALID_TOKEN',
      },
    });
  }
}
