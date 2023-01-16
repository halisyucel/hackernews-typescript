import * as yup from 'yup';

export const createLinkValidation = yup.object().shape({
  description: yup.string().required().min(5).max(255),
  url: yup.string().url().required(),
});
