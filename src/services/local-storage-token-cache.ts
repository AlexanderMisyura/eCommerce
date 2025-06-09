import type { TokenCache, TokenStore } from '@commercetools/ts-client';
import { DEFAULT_TOKEN_STORE } from '@constants';
import { isTokenStore } from '@utils';

const STORAGE_KEY = 'the-team-e-commerce-token-store';

export class LocalStorageTokenCache implements TokenCache {
  private myCache: TokenStore;

  constructor() {
    this.myCache = DEFAULT_TOKEN_STORE;
    const localStorageToken = localStorage.getItem(STORAGE_KEY);

    if (localStorageToken) {
      const parseToken: unknown = JSON.parse(localStorageToken);

      if (isTokenStore(parseToken) && parseToken && parseToken.expirationTime > Date.now()) {
        this.myCache = parseToken;
      }
    }
  }

  public get(): TokenStore {
    return this.myCache;
  }

  public getRefreshToken(): string | undefined {
    return this.myCache.refreshToken;
  }

  public isExist(): boolean {
    if (this.myCache.token) return true;
    return false;
  }

  public reset(): void {
    this.myCache = DEFAULT_TOKEN_STORE;
    localStorage.removeItem(STORAGE_KEY);
  }

  public resetToken(): void {
    this.myCache = DEFAULT_TOKEN_STORE;
  }

  public set(newCache: TokenStore): void {
    this.myCache = { ...newCache };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.myCache));
  }
}
