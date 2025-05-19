import type { RegistrationContextType } from '@ts-interfaces';
import { createContext } from 'react';

export const RegistrationContext = createContext<RegistrationContextType | null>(null);
