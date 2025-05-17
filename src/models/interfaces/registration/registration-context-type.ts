import type { CUSTOMER_DRAFT_DEFAULT } from '@constants';

import type { AddressesOptions } from './addresses-options';
import type { AddressesState } from './addresses-state';
import type { CredentialsState } from './credentials-state';

export interface RegistrationContextData {
  customerDraft: typeof CUSTOMER_DRAFT_DEFAULT;
  addressesState: AddressesState;
  credentialsState: CredentialsState;
  addressesOptions: AddressesOptions;
  step: number;
}

export interface RegistrationContextType {
  registrationContext: RegistrationContextData;
  setRegistrationContext: (registrationContext: RegistrationContextData) => void;
  resetRegistrationContext: () => void;
}
