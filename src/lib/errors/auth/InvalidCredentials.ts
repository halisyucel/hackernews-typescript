import { GraphQLError } from 'graphql';

export default class InvalidCredentialsError extends GraphQLError {
  constructor(message?: string) {
    super(message || 'Invalid credentials', {
      extensions: {
        code: 'AUTH::INVALID_CREDENTIALS',
      },
    });
  }
}
