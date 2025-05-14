import { PASSWORD_MIN_LENGTH } from '@constants';
import type { SignInValidationErrors } from '@ts-interfaces';
import type { SignInType } from '@ts-types';

export function validateEmail(email: string) {
  const errors: string[] = [];

  if (email.length === 0) {
    errors.push('Please fill your email');
  }

  if (email.trim().length !== email.length) {
    errors.push('Email must not contain leading or trailing whitespace');
  }

  if (email.split('@').length !== 2) {
    errors.push("Email address must contain one '@' symbol separating local part and domain name");
  }

  const domainPart = email.split('@').at(-1);
  const labels = domainPart?.split('.');
  if (
    !domainPart ||
    domainPart.split('.').length < 2 ||
    labels?.some((label) => label.length === 0)
  ) {
    errors.push('Email address must contain a domain name');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return errors;
}

export function validatePassword(password: string) {
  const errors: string[] = [];

  if (password.length === 0) {
    errors.push('Please fill your password');
  }

  if (!/^(?!.*\s).+$/.test(password)) {
    errors.push('Password must not contain any spaces.');
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z]).+$/.test(password)) {
    errors.push('Password must contain at least one lowercase letter (a-z)');
  }

  if (!/(?=.*[A-Z]).+$/.test(password)) {
    errors.push('Password must contain at least one uppercase letter (A-Z)');
  }

  if (!/(?=.*\d).+$/.test(password)) {
    errors.push('Password must contain at least one digit (0-9)');
  }

  return errors;
}

export function validateSignIn(submission: SignInType): SignInValidationErrors {
  const validationErrors: SignInValidationErrors = {
    emailErrors: validateEmail(submission.email),
    passwordErrors: validatePassword(submission.password),
  };

  return validationErrors;
}
