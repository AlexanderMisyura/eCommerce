import { AppDataContext } from '@context';
import type { AppDataContextType } from '@ts-interfaces';
import { use } from 'react';

export const useAppDataContext = (): AppDataContextType => {
  const context = use(AppDataContext);
  if (!context) {
    throw new Error('useAppDataContext must be used within a AppDataProvider');
  }
  return context;
};
