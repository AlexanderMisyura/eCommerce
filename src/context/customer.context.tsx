import { type Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '@services/ctp-api-client.service';
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
      if (apiRoot.isTokenExist()) {
        const response = await apiRoot.root().me().get().execute();
        setCurrentCustomer(response.body);
      }
    };
    getMeData().catch(console.log);
  }, []);
  const value = { currentCustomer, setCurrentCustomer };
  return <CustomerContext value={value}>{children}</CustomerContext>;
};
