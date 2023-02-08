import { GraphQLError } from 'graphql';

export class LinkNotFound extends GraphQLError {
  constructor() {
    super('Link not found');
    Object.defineProperty(this, 'name', { value: 'LinkNotFound' });
  }
}
