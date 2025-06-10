import type { Cart, Customer } from '@commercetools/platform-sdk';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { CustomerContext } from './customer.context';

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({ currentCustomer, setCurrentCustomer, cart, setCart, loading, setLoading }),
    [currentCustomer, cart, loading]
  );

  return <CustomerContext value={value}>{children}</CustomerContext>;
};
