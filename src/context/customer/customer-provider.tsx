import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '@services';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { CustomerContext } from './customer.context';

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    getMeData().catch((error) => {
      console.error('Unexpected error:', error);
      setCurrentCustomer(null);
    });
  }, []);

  const value = useMemo(
    () => ({ currentCustomer, setCurrentCustomer, loading }),
    [currentCustomer, loading]
  );

  return <CustomerContext value={value}>{children}</CustomerContext>;
};
