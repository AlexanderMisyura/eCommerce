import { RegistrationContext } from '@context';
import type { RegistrationContextType } from '@ts-interfaces';
import { use } from 'react';

export const useRegistrationData = (): RegistrationContextType => {
  const context = use(RegistrationContext);

  if (!context) {
    throw new Error('useRegistrationData must be used within a RegistrationDataProvider');
  }

  return context;
};
