import { ToastContext } from '@context';
import { useToast } from '@hooks';
import { renderHook } from '@testing-library/react';
import type { ToastContextType } from '@ts-interfaces';

describe('useToast', () => {
  it('returns the context when ToastContext is available', () => {
    const context: ToastContextType = {
      showToast: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastContext value={context}>{children}</ToastContext>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current).toBe(context);
  });

  it('throws an error when ToastContext is not available', () => {
    expect(() => renderHook(() => useToast())).toThrowError(
      'useToast must be used within a ToastProvider'
    );
  });
});
