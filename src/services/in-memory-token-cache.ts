import type { TokenCache, TokenStore } from '@commercetools/ts-client';
import { DEFAULT_TOKEN_STORE } from '@constants';

export class InMemoryTokenCache implements TokenCache {
  private tokenStore: TokenStore = DEFAULT_TOKEN_STORE;

  public get(): TokenStore {
    return this.tokenStore;
  }

  public set(newCache: TokenStore): void {
    this.tokenStore = { ...newCache };
  }
}
