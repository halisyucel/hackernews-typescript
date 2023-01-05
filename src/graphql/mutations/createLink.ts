import { FieldResolver } from 'nexus';
import * as yup from 'yup';
import MissingTokenError from '../../lib/errors/auth/MissingTokenError';
import UnknownError from '../../lib/errors/common/UnknownError';
import ValidationError from '../../lib/errors/common/ValidationError';

const createLinkSchema = yup.object().shape({
  description: yup.string().min(1).max(255).required(),
  url: yup
    .string()
    .required()
    .test({
      name: 'is-url',
      // eslint-disable-next-line no-template-curly-in-string
      message: '${path} must be a valid URL',
      test: (value) => {
        if (!value) return false;

        return new RegExp(
          '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
          'i',
        ).test(value);
      },
    }),
});

const createLink: FieldResolver<'Mutation', 'createLink'> = async (
  _parent,
  { description, url },
  { prisma, userId },
) => {
  if (!userId) {
    throw new MissingTokenError();
  }

  try {
    const value = createLinkSchema.validateSync(
      { description, url },
      { abortEarly: false },
    );

    return prisma.link.create({
      data: {
        ...value,
        postedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      throw new ValidationError(err.errors);
    }
    throw new UnknownError();
  }
};

export default createLink;
