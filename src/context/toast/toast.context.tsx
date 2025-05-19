import type { ToastContextType } from '@ts-interfaces';
import { createContext } from 'react';

export const ToastContext = createContext<ToastContextType | null>(null);
