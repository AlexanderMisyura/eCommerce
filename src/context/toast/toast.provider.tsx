import { type ReactNode, useCallback, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { ToastContext } from './toast.context';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' | 'default' = 'default') => {
      toast(message, { type });
    },
    []
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext value={value}>
      {children}
      <ToastContainer />
    </ToastContext>
  );
};
