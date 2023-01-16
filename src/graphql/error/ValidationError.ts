import { GraphQLError } from 'graphql';

export class ValidationError extends GraphQLError {
  constructor(message: string | string[]) {
    super(Array.isArray(message) ? message.join(', ') : message);
    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }
}
