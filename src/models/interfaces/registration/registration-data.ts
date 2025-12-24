import type { Customer } from '@commercetools/platform-sdk';

export interface RegistrationData {
  serverErrors?: string[];
  customer?: Customer;
}
