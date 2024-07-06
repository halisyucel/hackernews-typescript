import { GraphQLError } from 'graphql';

export class NoTokenProvidedError extends GraphQLError {
  constructor() {
    super('No token provided');
    Object.defineProperty(this, 'name', { value: 'NoTokenProvidedError' });
  }
}
