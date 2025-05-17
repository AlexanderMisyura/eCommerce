import {
  ADDRESSES_OPTIONS_DEFAULT,
  CUSTOMER_ADDRESSES_STATE_DEFAULT,
  CUSTOMER_CREDENTIALS_STATE_DEFAULT,
  CUSTOMER_DRAFT_DEFAULT,
} from '@constants';
import type { RegistrationContextData } from '@ts-interfaces';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { RegistrationContext } from './registration.context';

export const RegistrationDataProvider = ({ children }: { children: ReactNode }) => {
  const [registrationContext, setRegistrationContext] = useState<RegistrationContextData>({
    customerDraft: CUSTOMER_DRAFT_DEFAULT,
    addressesState: CUSTOMER_ADDRESSES_STATE_DEFAULT,
    credentialsState: CUSTOMER_CREDENTIALS_STATE_DEFAULT,
    addressesOptions: ADDRESSES_OPTIONS_DEFAULT,
    step: 0,
  });

  function resetRegistrationContext(): void {
    setRegistrationContext({
      customerDraft: CUSTOMER_DRAFT_DEFAULT,
      addressesState: CUSTOMER_ADDRESSES_STATE_DEFAULT,
      credentialsState: CUSTOMER_CREDENTIALS_STATE_DEFAULT,
      addressesOptions: ADDRESSES_OPTIONS_DEFAULT,
      step: 0,
    });
  }

  const value = useMemo(
    () => ({ registrationContext, setRegistrationContext, resetRegistrationContext }),
    [registrationContext, setRegistrationContext]
  );

  return <RegistrationContext value={value}>{children}</RegistrationContext>;
};
