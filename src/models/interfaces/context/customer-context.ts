import type { Cart, Customer } from '@commercetools/platform-sdk';

export interface CustomerContextType {
  currentCustomer: Customer | null;
  cart: Cart | null;
  loading: boolean;
  setCurrentCustomer: (customer: Customer | null) => void;
  setCart: (cart: Cart | null) => void;
  setLoading: (loading: boolean) => void;
}
