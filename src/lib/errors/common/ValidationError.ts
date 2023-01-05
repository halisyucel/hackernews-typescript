import { GraphQLError } from 'graphql';

export default class ValidationError extends GraphQLError {
  constructor(errors: string[], message?: string) {
    super(message || `Validation error: \n - ${errors.join('\n - ')}`, {
      extensions: {
        code: 'COMMON::VALIDATION_ERROR',
      },
    });
  }
}
