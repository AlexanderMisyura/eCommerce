export interface CredentialsValidationErrors {
  emailErrors: string[];
  passwordErrors: string[];
  firstNameErrors: string[];
  lastNameErrors: string[];
  dateOfBirthErrors: string[];
}

export interface AddressesValidationErrors {
  shippingStreetNameErrors: string[];
  shippingCityErrors: string[];
  shippingPostalCodeErrors: string[];
  shippingCountryErrors: string[];
  billingStreetNameErrors: string[];
  billingCityErrors: string[];
  billingPostalCodeErrors: string[];
  billingCountryErrors: string[];
}
