import type { Cart, Customer, DiscountCode } from '@commercetools/platform-sdk';

export interface AppDataContextType {
  currentCustomer: Customer | null;
  cart: Cart | null;
  discountCodes: DiscountCode[];
  loading: boolean;
  setCurrentCustomer: (customer: Customer | null) => void;
  setCart: (cart: Cart | null) => void;
  setDiscountCodes: (discountCodes: DiscountCode[]) => void;
  setLoading: (loading: boolean) => void;
}
