import { ToastContext } from '@context';
import type { ToastContextType } from '@ts-interfaces';
import { use } from 'react';

export const useToast = (): ToastContextType => {
  const context = use(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
