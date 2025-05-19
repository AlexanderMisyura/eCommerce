import { CITY, COUNTRY, FIRST_NAME, LAST_NAME, PASSWORD_MIN_LENGTH } from '@constants';
import type {
  Addresses,
  AddressesValidationErrors,
  Credentials,
  CredentialsValidationErrors,
  SignInValidationErrors,
} from '@ts-interfaces';
import type { SignInType } from '@ts-types';
import dayjs from 'dayjs';

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

export function validateProperName(name: string, fieldName?: string) {
  const errors: string[] = [];

  if (name.length === 0) {
    errors.push(`Please fill your ${fieldName}`);
  }

  if (/\d/.test(name)) {
    errors.push(`Your ${fieldName} must not contain numbers`);
  }

  if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(name)) {
    errors.push(`Your ${fieldName} must not contain special characters`);
  }

  return errors;
}

export function validateDateOfBirth(dateOfBirth: string) {
  const errors: string[] = [];

  if (!dateOfBirth) {
    errors.push('Please select your date of birth');
  }

  if (dayjs().diff(dateOfBirth, 'year') < 13) {
    errors.push('You must be at least 13 years old to register');
  }

  return errors;
}

export function validateStreetName(city: string) {
  const errors: string[] = [];

  if (city.length === 0) {
    errors.push('Please fill your city');
  }

  return errors;
}

export function validatePostalCode(postalCode: string) {
  const errors: string[] = [];

  if (postalCode.length === 0) {
    errors.push('Please fill your postal code');
  }

  if (!/^\d{5}$/.test(postalCode)) {
    errors.push('Postal code must be a 5-digit number');
  }

  return errors;
}

export function validateCountry(country: string) {
  const errors: string[] = [];

  if (country.length === 0) {
    errors.push('Please select your country');
  }

  if (!Object.values(COUNTRY).includes(country as (typeof COUNTRY)[keyof typeof COUNTRY])) {
    errors.push('Please select a valid country');
  }

  return errors;
}

export function validateCredentials(credentials: Credentials): CredentialsValidationErrors {
  const validationErrors: CredentialsValidationErrors = {
    emailErrors: validateEmail(credentials.email),
    passwordErrors: validatePassword(credentials.password),
    firstNameErrors: validateProperName(credentials.firstName, FIRST_NAME),
    lastNameErrors: validateProperName(credentials.lastName, LAST_NAME),
    dateOfBirthErrors: validateDateOfBirth(credentials.dateOfBirth),
  };

  return validationErrors;
}

export function validateAddresses(address: Addresses) {
  const validationErrors: AddressesValidationErrors = {
    shippingStreetNameErrors: validateStreetName(address.shippingStreetName),
    shippingCityErrors: validateProperName(address.shippingCity, CITY),
    shippingPostalCodeErrors: validatePostalCode(address.shippingPostalCode.toString()),
    shippingCountryErrors: validateCountry(address.shippingCountry),
    billingStreetNameErrors: validateStreetName(address.billingStreetName),
    billingCityErrors: validateProperName(address.billingCity, CITY),
    billingPostalCodeErrors: validatePostalCode(address.billingPostalCode.toString()),
    billingCountryErrors: validateCountry(address.billingCountry),
  };

  return validationErrors;
}
