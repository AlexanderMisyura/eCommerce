import { UrlPath } from '@ts-enums';
import { type ActionFunctionArgs, redirect } from 'react-router';

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const submission = {
    email: data.get('email'),
    password: data.get('password'),
  };
  //
  console.log({ submission });
  const errors: string[] = [];
  if (typeof submission.password === 'string') {
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
  }

  if (errors.length > 0) return errors;

  //TO-DO: do something with API request

  //if user correctly authenticated
  return redirect(UrlPath.HOME);
};
