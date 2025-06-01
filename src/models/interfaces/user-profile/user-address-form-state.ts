import type { UserAddressType } from './user-address';

export interface UserAddressFormState {
  address: UserAddressFieldsState;
  addressType: UserAddressType;
}

export interface UserAddressFieldsState {
  city: FormFieldState;
  streetName: FormFieldState;
  country: FormFieldState;
  postalCode: FormFieldState;
}

export interface FormFieldState {
  value: string;
  error: boolean;
  errorMessage: string;
}
