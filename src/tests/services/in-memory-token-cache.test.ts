import type { TokenStore } from '@commercetools/ts-client';
import { DEFAULT_TOKEN_STORE } from '@constants';
import { InMemoryTokenCache } from '@services';
import { expect } from 'vitest';

describe('InMemoryTokenCache', () => {
  let cache: InMemoryTokenCache;
  const tokenStore: TokenStore = {
    token: 'token',
    expirationTime: Date.now() + 1000,
    refreshToken: 'refreshToken',
  };

  beforeEach(() => {
    cache = new InMemoryTokenCache();
  });

  it('should initialize with DEFAULT_TOKEN_STORE', () => {
    expect(cache.get()).to.deep.equal(DEFAULT_TOKEN_STORE);
  });

  it('should update tokenStore on set', () => {
    cache.set(tokenStore);
    expect(cache.get()).to.deep.equal(tokenStore);
  });
});
