import type { CustomerContextType } from '@ts-interfaces';
import { CustomerContext } from 'context/customer';
import { use } from 'react';

export const useCustomerContext = (): CustomerContextType => {
  const context = use(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};
