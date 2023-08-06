import * as yup from 'yup';

export const signInSchema = yup
  .object({
    email: yup.string().required('Email required').email('Invalid email'),
    password: yup
      .string()
      .required('Password required')
      .min(8, 'Password must have at least 8 characters')
      .max(24, 'Password cannot exceed 24 characters'),
  })
  .required();
