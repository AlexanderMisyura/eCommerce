/* FIELDS */
export const USER_ADDRESS_FORM_FIELD_NAMES = {
  city: 'city',
  streetName: 'streetName',
  country: 'country',
  postalCode: 'postalCode',
} as const;

export const USER_ADDRESS_FORM_FIELD_LABELS = {
  city: 'City *',
  streetName: 'Street Name *',
  country: 'Country *',
  postalCode: 'Postal Code *',
} as const;

export const USER_ADDRESS_FORM_FIELD_PLACEHOLDERS = {
  city: 'Enter your city',
  streetName: 'Enter your street name',
  country: 'Select your country',
  postalCode: 'Enter your postal code',
} as const;

/* CHECKBOX */
export const USER_ADDRESS_FORM_CHECKBOX_NAMES = {
  useAsShipping: 'useAsShipping',
  useAsBilling: 'useAsBilling',
  setAsDefaultShipping: 'setAsDefaultShipping',
  setAsDefaultBilling: 'setAsDefaultBilling',
} as const;

export const USER_ADDRESS_FORM_CHECKBOX_LABELS = {
  useAsShipping: 'Use as shipping',
  useAsBilling: 'Use as billing',
  setAsDefaultShipping: 'Set as default shipping',
  setAsDefaultBilling: 'Set as default billing',
} as const;

/* DEFAULT_VALUES */
export const USER_ADDRESS_FORM_DEFAULT_VALUES = {
  city: { value: '', error: false, errorMessage: '' },
  streetName: { value: '', error: false, errorMessage: '' },
  country: { value: '', error: false, errorMessage: '' },
  postalCode: { value: '', error: false, errorMessage: '' },
};

export const USER_ADDRESS_OPTION_FORM_DEFAULT_VALUES = {
  useAsShipping: false,
  useAsBilling: false,
  setAsDefaultShipping: false,
  setAsDefaultBilling: false,
} as const;
