import {
  ADDRESSES_OPTIONS_DEFAULT,
  CUSTOMER_ADDRESSES_STATE_DEFAULT,
  CUSTOMER_CREDENTIALS_STATE_DEFAULT,
  CUSTOMER_DRAFT_DEFAULT,
} from '@constants';
import { RegistrationContext } from '@context';
import { useRegistrationData } from '@hooks';
import { renderHook } from '@testing-library/react';
import type { RegistrationContextType } from '@ts-interfaces';

describe('useRegistrationData', () => {
  it('returns the context when RegistrationContext is available', () => {
    const context: RegistrationContextType = {
      registrationContext: {
        customerDraft: CUSTOMER_DRAFT_DEFAULT,
        addressesState: CUSTOMER_ADDRESSES_STATE_DEFAULT,
        credentialsState: CUSTOMER_CREDENTIALS_STATE_DEFAULT,
        addressesOptions: ADDRESSES_OPTIONS_DEFAULT,
        step: 0,
      },
      setRegistrationContext: vi.fn(),
      resetRegistrationContext: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RegistrationContext value={context}>{children}</RegistrationContext>
    );

    const { result } = renderHook(() => useRegistrationData(), { wrapper });

    expect(result.current).toBe(context);
  });

  it('throws an error when RegistrationContext is not available', () => {
    expect(() => renderHook(() => useRegistrationData())).toThrowError(
      'useRegistrationData must be used within a RegistrationDataProvider'
    );
  });
});
