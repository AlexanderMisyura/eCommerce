import type { CustomerContextType } from '@ts-interfaces';
import { createContext } from 'react';

export const CustomerContext = createContext<CustomerContextType | null>(null);
