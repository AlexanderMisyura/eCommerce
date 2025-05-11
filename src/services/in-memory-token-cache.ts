import { type TokenCache, type TokenStore } from '@commercetools/ts-client';

export class InMemoryTokenCache implements TokenCache {
  private myCache: TokenStore = {
    expirationTime: 0,
    refreshToken: undefined,
    token: '',
  };

  public get(): TokenStore {
    return this.myCache;
  }

  public isExist(): boolean {
    if (this.myCache.token) return true;
    return false;
  }

  public set(newCache: TokenStore): void {
    this.myCache = newCache;
  }
}
