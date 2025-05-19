import type { Address } from '@ts-interfaces';

import type { SignInType } from './sign-in-type';

export type RegistrationType = SignInType & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
};
