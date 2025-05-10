import type { SignInType } from './sign-in-type';

export type RegistrationType = SignInType & {
  firstName: string;
  lastName: string;
  passwordConfirm: string;
};
