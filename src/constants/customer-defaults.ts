import type { CustomerDraft } from '@commercetools/platform-sdk';

export const CUSTOMER_DRAFT_DEFAULT: CustomerDraft = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  shippingAddresses: [],
  billingAddresses: [],
  defaultBillingAddress: undefined,
  defaultShippingAddress: undefined,
};

export const CUSTOMER_CREDENTIALS_STATE_DEFAULT = {
  email: { value: '', error: false, errorMessage: '' },
  password: { value: '', error: false, errorMessage: '' },
  firstName: { value: '', error: false, errorMessage: '' },
  lastName: { value: '', error: false, errorMessage: '' },
  dateOfBirth: { value: null, error: false, errorMessage: '' },
};

export const CUSTOMER_ADDRESSES_STATE_DEFAULT = {
  shippingCity: { value: '', error: false, errorMessage: '' },
  shippingStreetName: { value: '', error: false, errorMessage: '' },
  shippingCountry: { value: '', error: false, errorMessage: '' },
  shippingPostalCode: { value: '', error: false, errorMessage: '' },
  billingCity: { value: '', error: false, errorMessage: '' },
  billingStreetName: { value: '', error: false, errorMessage: '' },
  billingCountry: { value: '', error: false, errorMessage: '' },
  billingPostalCode: { value: '', error: false, errorMessage: '' },
};

export const ADDRESSES_OPTIONS_DEFAULT = {
  useDefaultShipping: false,
  useDefaultBilling: false,
  useShippingAsBilling: false,
};
