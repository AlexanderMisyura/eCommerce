import type { AppDataContextType } from '@ts-interfaces';
import { createContext } from 'react';

export const AppDataContext = createContext<AppDataContextType | null>(null);
