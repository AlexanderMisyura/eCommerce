import type { ReactNode } from 'react';

export interface ToastContextType {
  showToast: (
    message: string | ReactNode,
    type: 'success' | 'error' | 'info' | 'warning' | 'default'
  ) => void;
}
