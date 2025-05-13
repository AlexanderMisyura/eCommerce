import { type Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '@services';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

interface CustomerContextType {
  currentCustomer: Customer | null;
  setCurrentCustomer: (user: Customer | null) => void;
}

export const CustomerContext = createContext<CustomerContextType | null>(null);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  useEffect(() => {
    const getMeData = async () => {
      try {
        if (apiRoot.isTokenExist()) {
          const response = await apiRoot.root().me().get().execute();
          setCurrentCustomer(response.body);
        }
      } catch (error) {
        console.error('Error, while try to get customer:', error);
        setCurrentCustomer(null);
      }
    };
    getMeData().catch((error) => {
      console.error('Unexpected error:', error);
      setCurrentCustomer(null);
    });
  }, []);
  const value = { currentCustomer, setCurrentCustomer };
  return <CustomerContext value={value}>{children}</CustomerContext>;
};
