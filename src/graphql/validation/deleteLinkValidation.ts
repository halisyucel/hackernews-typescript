import * as yup from 'yup';

export const deleteLinkValidation = yup.object().shape({
  id: yup.string().required(),
});
