import { AppDataContext } from '@context';
import { useAppDataContext } from '@hooks';
import { renderHook } from '@testing-library/react';
import type { AppDataContextType } from '@ts-interfaces';

describe('useAppDataContext', () => {
  it('returns the context when AppDataContext is available', () => {
    const context: AppDataContextType = {
      currentCustomer: null,
      cart: null,
      discountCodes: [],
      loading: false,
      setCurrentCustomer: vi.fn(),
      setCart: vi.fn(),
      setDiscountCodes: vi.fn(),
      setLoading: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppDataContext value={context}>{children}</AppDataContext>
    );

    const { result } = renderHook(() => useAppDataContext(), { wrapper });

    expect(result.current).toBe(context);
  });

  it('throws an error when AppDataContext is not available', () => {
    expect(() => renderHook(() => useAppDataContext())).toThrowError(
      'useAppDataContext must be used within a AppDataProvider'
    );
  });
});
