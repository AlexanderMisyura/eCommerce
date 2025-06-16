import { styled } from '@mui/material';
import { type ReactNode, useCallback, useMemo } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';

import { ToastContext } from './toast.context';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = useCallback(
    (
      message: string | ReactNode,
      type: 'success' | 'error' | 'info' | 'warning' | 'default' = 'default'
    ) => {
      toast(message, { type, style: { width: 'clamp(320px, 40vw, 420px)' } });
    },
    []
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext value={value}>
      {children}
      <StyledToastContainer autoClose={3500} transition={Zoom} position="top-right" />
    </ToastContext>
  );
};

const StyledToastContainer = styled(ToastContainer)`
  top: 72px;
  right: 8px;
`;
