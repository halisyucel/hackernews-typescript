import { GraphQLError } from 'graphql';

export default class UnknownError extends GraphQLError {
  constructor(message?: string) {
    super(message || 'An unknown error occurred', {
      extensions: {
        code: 'COMMON::UNKNOWN_ERROR',
      },
    });
  }
}
