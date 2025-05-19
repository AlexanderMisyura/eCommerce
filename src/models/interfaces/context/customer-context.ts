import type { Customer } from '@commercetools/platform-sdk';

export interface CustomerContextType {
  currentCustomer: Customer | null;
  loading: boolean;
  setCurrentCustomer: (customer: Customer | null) => void;
}
