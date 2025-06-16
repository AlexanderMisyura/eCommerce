import type { TokenStore } from '@commercetools/ts-client';
import { DEFAULT_TOKEN_STORE } from '@constants';
import { LocalStorageTokenCache } from '@services';

describe('LocalStorageTokenCache', () => {
  let tokenCache: LocalStorageTokenCache;

  const tokenStore: TokenStore = {
    expirationTime: Date.now() + 10_000,
    refreshToken: 'refreshToken',
    token: 'token',
  };

  beforeEach(() => {
    localStorage.clear();
    tokenCache = new LocalStorageTokenCache();
  });

  it('should initialize with DEFAULT_TOKEN_STORE if localStorage is empty', () => {
    const cache = tokenCache.get();
    expect(cache).toEqual(DEFAULT_TOKEN_STORE);
  });

  it('should set and retrieve a token store correctly', () => {
    tokenCache.set(tokenStore);
    const retrieved = tokenCache.get();
    expect(retrieved).toEqual(tokenStore);
  });

  it('should retrieve the refresh token correctly', () => {
    tokenCache.set(tokenStore);
    const refreshToken = tokenCache.getRefreshToken();
    expect(refreshToken).toEqual('refreshToken');
  });

  it('should return true for isExist if token exists', () => {
    tokenCache.set(tokenStore);
    expect(tokenCache.isExist()).toBe(true);
  });

  it('should return false for isExist if token does not exist', () => {
    expect(tokenCache.isExist()).toBe(false);
  });

  it('should reset to DEFAULT_TOKEN_STORE and clear localStorage', () => {
    tokenCache.set(tokenStore);
    tokenCache.reset();
    expect(tokenCache.get()).toEqual(DEFAULT_TOKEN_STORE);
    expect(localStorage.getItem('the-team-e-commerce-token-store')).toBeNull();
  });

  it('should reset token to DEFAULT_TOKEN_STORE without clearing localStorage', () => {
    tokenCache.set(tokenStore);
    tokenCache.resetToken();
    expect(tokenCache.get()).toEqual(DEFAULT_TOKEN_STORE);
  });
});
