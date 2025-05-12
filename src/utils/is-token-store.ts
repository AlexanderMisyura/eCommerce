import { type TokenStore } from '@commercetools/ts-client';

export const isTokenStore = (data: unknown): data is TokenStore => {
  return data &&
    typeof data === 'object' &&
    'expirationTime' in data &&
    typeof data.expirationTime === 'number' &&
    'refreshToken' in data &&
    typeof data.refreshToken === 'string' &&
    'token' in data &&
    typeof data.token === 'string'
    ? true
    : false;
};
