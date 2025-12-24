import type { RegistrationFieldState } from './registration-field-state';

export interface AddressesState {
  shippingCity: RegistrationFieldState;
  shippingStreetName: RegistrationFieldState;
  shippingCountry: RegistrationFieldState;
  shippingPostalCode: RegistrationFieldState;
  billingCity: RegistrationFieldState;
  billingStreetName: RegistrationFieldState;
  billingCountry: RegistrationFieldState;
  billingPostalCode: RegistrationFieldState;
}
