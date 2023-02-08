import { GraphQLError } from 'graphql';

export class AuthenticationFailedError extends GraphQLError {
  constructor() {
    super('Authentication failed');
    Object.defineProperty(this, 'name', { value: 'AuthenticationFailedError' });
  }
}
