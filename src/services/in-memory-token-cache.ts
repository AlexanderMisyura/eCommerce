import { type TokenCache, type TokenStore } from '@commercetools/ts-client';
import { isTokenStore } from '@utils';

const defaultTokenStore = {
  expirationTime: 0,
  refreshToken: undefined,
  token: '',
};

export class InMemoryTokenCache implements TokenCache {
  private myCache: TokenStore;

  constructor() {
    this.myCache = defaultTokenStore;
    const localStorageToken = localStorage.getItem('token');
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

  public isExist(): boolean {
    if (this.myCache.token) return true;
    return false;
  }

  public reset(): void {
    this.myCache = defaultTokenStore;
    localStorage.removeItem('token');
  }

  public resetToken(): void {
    this.myCache = defaultTokenStore;
  }

  public set(newCache: TokenStore): void {
    this.myCache = { ...newCache };
    localStorage.setItem('token', JSON.stringify(this.myCache));
  }
}
