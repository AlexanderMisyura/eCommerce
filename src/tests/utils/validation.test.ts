import { COUNTRY } from '@constants';
import type { Addresses, Credentials } from '@ts-interfaces';
import {
  validateAddresses,
  validateCountry,
  validateCredentials,
  validateDateOfBirth,
  validateEmail,
  validatePassword,
  validatePostalCode,
  validateProperName,
  validateSignIn,
  validateStreetName,
} from '@utils';

describe('Validation Tests', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toContain('Please fill your email');
    });

    it('should return error for email with leading whitespace', () => {
      expect(validateEmail(' test@test.test')).toContain(
        'Email must not contain leading or trailing whitespace'
      );
    });

    it('should return error for email without @', () => {
      expect(validateEmail('test.test')).toContain(
        "Email address must contain one '@' symbol separating local part and domain name"
      );
    });

    it('should return error for email with invalid domain', () => {
      expect(validateEmail('test@.test')).toContain('Email address must contain a domain name');
    });
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toContain('Please fill your password');
    });

    it('should return error for password with whitespaces', () => {
      expect(validatePassword('t est')).toContain('Password must not contain any spaces.');
    });

    it('should return error for password less than minimum length', () => {
      expect(validatePassword('1234567')).toContain('Password must be at least 8 characters long');
    });

    it('should return error for password without lowercase letter', () => {
      expect(validatePassword('TEST1234')).toContain(
        'Password must contain at least one lowercase letter (a-z)'
      );
    });

    it('should return error for password without uppercase letter', () => {
      expect(validatePassword('test1234')).toContain(
        'Password must contain at least one uppercase letter (A-Z)'
      );
    });

    it('should return error for password without digit', () => {
      expect(validatePassword('TestTest')).toContain(
        'Password must contain at least one digit (0-9)'
      );
    });
  });

  describe('validateProperName', () => {
    const fieldName = 'city';

    it('should return error for empty proper name', () => {
      expect(validateProperName('', fieldName)).toContain(`Please fill your ${fieldName}`);
    });

    it('should return error for proper name with numbers', () => {
      expect(validateProperName('123', fieldName)).toContain(
        `Your ${fieldName} must not contain numbers`
      );
    });

    it('should return error for proper name with special characters', () => {
      expect(validateProperName('test%', fieldName)).toContain(
        `Your ${fieldName} must not contain special characters`
      );
    });
  });

  describe('validateDateOfBirth', () => {
    it('should return error for empty date of birth', () => {
      expect(validateDateOfBirth('')).toContain('Please select your date of birth');
    });

    it('should return error for date of birth less than 13 years old', () => {
      expect(validateDateOfBirth('2025-01-01')).toContain(
        'You must be at least 13 years old to register'
      );
    });
  });

  describe('validateStreetName', () => {
    it('should return error for empty street name', () => {
      expect(validateStreetName('')).toContain('Please fill your street');
    });
  });

  describe('validatePostalCode', () => {
    it('should return error for empty postal code', () => {
      expect(validatePostalCode('')).toContain('Please fill your postal code');
    });

    it('should return error for postal code with invalid format', () => {
      expect(validatePostalCode('test5')).toContain('Postal code must be a 5-digit number');
    });
  });

  describe('validateCountry', () => {
    it('should return error for empty country', () => {
      expect(validateCountry('')).toContain('Please select your country');
    });

    it('should return error for invalid country', () => {
      expect(validateCountry('InvalidCountry')).toContain('Please select a valid country');
    });
  });

  describe('validateSignIn', () => {
    it('should validate sign-in form correctly', () => {
      const errors = validateSignIn({
        email: 'test@test.test',
        password: 'Test1234',
      });

      expect(errors.emailErrors).toHaveLength(0);
      expect(errors.passwordErrors).toHaveLength(0);
    });
  });

  describe('validateCredentials', () => {
    const credentials: Credentials = {
      email: 'test@test.com',
      password: 'Test1234',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
    };

    it('should validate credentials correctly', () => {
      const errors = validateCredentials(credentials);

      expect(errors.emailErrors).toHaveLength(0);
      expect(errors.passwordErrors).toHaveLength(0);
      expect(errors.firstNameErrors).toHaveLength(0);
      expect(errors.lastNameErrors).toHaveLength(0);
      expect(errors.dateOfBirthErrors).toHaveLength(0);
    });
  });

  describe('validateAddresses', () => {
    const address: Addresses = {
      shippingStreetName: 'test',
      shippingCity: 'test',
      shippingPostalCode: '11111',
      shippingCountry: COUNTRY.BELARUS,
      billingStreetName: 'test',
      billingCity: 'test',
      billingPostalCode: '22222',
      billingCountry: COUNTRY.BELARUS,
    };

    it('should validate addresses correctly', () => {
      const errors = validateAddresses(address);

      expect(errors.shippingStreetNameErrors).toHaveLength(0);
      expect(errors.shippingCityErrors).toHaveLength(0);
      expect(errors.shippingPostalCodeErrors).toHaveLength(0);
      expect(errors.shippingCountryErrors).toHaveLength(0);
      expect(errors.billingStreetNameErrors).toHaveLength(0);
      expect(errors.billingCityErrors).toHaveLength(0);
      expect(errors.billingPostalCodeErrors).toHaveLength(0);
      expect(errors.billingCountryErrors).toHaveLength(0);
    });
  });
});
