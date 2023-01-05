import { GraphQLError } from 'graphql';

export default class EmailAlreadyTakenError extends GraphQLError {
  constructor(message?: string) {
    super(message || 'The provided email is already taken', {
      extensions: {
        code: 'AUTH::EMAIL_ALREADY_TAKEN',
      },
    });
  }
}
