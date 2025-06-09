import type { StatusToken } from '@ts-types';

export const isStatusToken = (data: unknown): data is StatusToken => {
  return data && typeof data === 'string' && (data === 'auth' || data === 'noAuth') ? true : false;
};
