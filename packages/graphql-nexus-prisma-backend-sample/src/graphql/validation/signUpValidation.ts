import * as yup from 'yup';

export const signUpValidation = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(20)
    .test({
      name: 'password',
      message:
        'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character',
      test: (value) => {
        if (!value) return false;

        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        return passwordRegex.test(value);
      },
    }),
});
