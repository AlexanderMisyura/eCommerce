import type { Cart, Customer, DiscountCode } from '@commercetools/platform-sdk';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { AppDataContext } from './app-data.context';

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({
      currentCustomer,
      setCurrentCustomer,
      cart,
      setCart,
      discountCodes,
      setDiscountCodes,
      loading,
      setLoading,
    }),
    [currentCustomer, cart, discountCodes, loading]
  );

  return <AppDataContext value={value}>{children}</AppDataContext>;
};
