export const FIRST_NAME = 'first name';
export const LAST_NAME = 'last name';
export const CITY = 'city';
export const PLACEHOLDER = {
  EMAIL: 'your@email',
  PASSWORD: '••••••••',
  FIRST_NAME: 'John',
  LAST_NAME: 'Doe',
  CITY: 'City',
  STREET_NAME: 'Street name',
  COUNTRY: 'Country',
  POSTAL_CODE: 'Postal code',
};
export const DATE_OF_BIRTH_FORMAT = 'YYYY-MM-DD';

export const FIELD_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  DATE_OF_BIRTH: 'dateOfBirth',
  SHIPPING_CITY: 'shippingCity',
  SHIPPING_STREET_NAME: 'shippingStreetName',
  SHIPPING_COUNTRY: 'shippingCountry',
  SHIPPING_POSTAL_CODE: 'shippingPostalCode',
  BILLING_CITY: 'billingCity',
  BILLING_STREET_NAME: 'billingStreetName',
  BILLING_COUNTRY: 'billingCountry',
  BILLING_POSTAL_CODE: 'billingPostalCode',
} as const;

export const CHECKBOX_NAME = {
  USE_DEFAULT_SHIPPING: 'useDefaultShipping',
  USE_DEFAULT_BILLING: 'useDefaultBilling',
  USE_SHIPPING_AS_BILLING: 'useShippingAsBilling',
} as const;

export const SHIPPING_ADDRESS_INDEX = 0;
export const BILLING_ADDRESS_INDEX = 1;
