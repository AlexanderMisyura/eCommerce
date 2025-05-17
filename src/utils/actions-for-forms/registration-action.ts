import { apiRoot, registrationApp, requestMeInfo } from '@services';
import type { RegistrationType } from '@ts-types';
import { convertFormDataToString } from '@utils';
import { type ActionFunctionArgs } from 'react-router';

export const registrationAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const submission: RegistrationType = {
    email: convertFormDataToString(data.get('email')),
    password: convertFormDataToString(data.get('password')),
    passwordConfirm: convertFormDataToString(data.get('passwordConfirm')),
    firstName: convertFormDataToString(data.get('firstName')),
    lastName: convertFormDataToString(data.get('lastName')),
  };

  const { email, password, passwordConfirm, firstName, lastName } = submission;
  const errors: string[] = [];
  if (password !== passwordConfirm) {
    errors.push('Your password and confirmation password do not match');
  }
  if (firstName.length < 3) {
    errors.push('Your first name needs to be at least 2 letters long');
  }
  if (email.length === 0) {
    errors.push('Please fill your email');
  }
  if (lastName.length < 3) {
    errors.push('Your last name needs to be at least 2 letters long');
  }
  if (password.length < 6) {
    errors.push('password length need more than 6 letters');
  }
  let regex = /^$|(?=.*[a-z]).+$/;
  if (!regex.test(password)) {
    errors.push('password need contain 1 and more letter in lowercase');
  }
  regex = /^$|(?=.*[A-Z]).+$/;
  if (!regex.test(password)) {
    errors.push('password need contain 1 and more letter in uppercase');
  }
  regex = /^$|(?=.*\d).+$/;
  if (!regex.test(password)) {
    errors.push('password need contain 1 and more number');
  }

  if (errors.length > 0) return errors;

  try {
    const data = await registrationApp(submission);
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
