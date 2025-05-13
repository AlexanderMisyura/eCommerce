import { apiRoot, requestMeInfo, requestSignInApp } from '@services';
import { type SignInType } from '@ts-types';
import { convertFormDataToString } from '@utils';
import { type ActionFunctionArgs } from 'react-router';

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const submission: SignInType = {
    email: convertFormDataToString(data.get('email')),
    password: convertFormDataToString(data.get('password')),
  };
  const errors: string[] = [];
  if (submission.password.length < 6) {
    errors.push('password length need more than 6 letters');
  }
  let regex = /^$|(?=.*[a-z]).+$/;
  if (!regex.test(submission.password)) {
    errors.push('password need contain 1 and more letter in lowercase');
  }
  regex = /^$|(?=.*[A-Z]).+$/;
  if (!regex.test(submission.password)) {
    errors.push('password need contain 1 and more letter in uppercase');
  }
  regex = /^$|(?=.*\d).+$/;
  if (!regex.test(submission.password)) {
    errors.push('password need contain 1 and more number');
  }

  if (errors.length > 0) return errors;

  try {
    const data = await requestSignInApp(submission);
    apiRoot.setUserData(submission);
    await requestMeInfo();
    return data.body.customer;
  } catch (error) {
    if (error instanceof Error) {
      errors.push(error.message);
    } else {
      errors.push('Unexpected error! Try one more time!');
    }
    return errors;
  }
};
