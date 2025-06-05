import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  type Client,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type LoggerMiddlewareOptions,
  type MiddlewareResponse,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  type TokenStore,
} from '@commercetools/ts-client';
import CTP_CONFIG from '@config/ctp-api-client-config';
import type { SignInType } from '@ts-types';

import { InMemoryTokenCache } from './in-memory-token-cache';

const { PROJECT_KEY, CLIENT_SECRET, CLIENT_ID, AUTH_URL, API_URL, SCOPES } = CTP_CONFIG;

class ApiRoot {
  private userData: SignInType | null;
  private tokenCache: InMemoryTokenCache;
  private loggerMiddlewareOptions: LoggerMiddlewareOptions = {
    loggerFn: (response: MiddlewareResponse) => {
      console.log('Response is:', response);
    },
  };
  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: API_URL,
    includeResponseHeaders: true,
    maskSensitiveHeaderData: false,
    includeOriginalRequest: true,
    includeRequestInErrorResponse: true,
    enableRetry: false,
    retryConfig: {
      maxRetries: 3,
      retryDelay: 200,
      backoff: false,
      retryCodes: [500, 503],
    },
    httpClient: fetch,
  };

  constructor(tokenCache: InMemoryTokenCache) {
    this.userData = null;
    this.tokenCache = tokenCache;
  }

  public root(): ByProjectKeyRequestBuilder {
    if (this.userData) {
      console.log('password flow');
      return this.withPasswordFlow();
    } else if (this.tokenCache.isExist()) {
      return this.withRefreshTokenFlow();
    } else {
      return this.withAnonymousTokenFlow();
    }
  }

  public setUserData(value: SignInType): void {
    this.userData = value;
  }

  public isTokenExist(): boolean {
    return this.tokenCache.isExist();
  }

  public getToken(): TokenStore {
    return this.tokenCache?.get();
  }

  public reset(): void {
    this.tokenCache.reset();
    this.resetUser();
  }

  public resetUser() {
    this.userData = null;
  }

  private createApiRootFromClient(client: Client) {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PROJECT_KEY,
    });

    return apiRoot;
  }

  private withAnonymousTokenFlow() {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET },
      scopes: [SCOPES],
      httpClient: fetch,
      tokenCache: this.tokenCache,
    };

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware(this.loggerMiddlewareOptions)
      .build();

    return this.createApiRootFromClient(client);
  }

  private withPasswordFlow(): ByProjectKeyRequestBuilder {
    const options: PasswordAuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        user: {
          username: this.userData ? this.userData.email : '',
          password: this.userData ? this.userData.password : '',
        },
      },
      scopes: [SCOPES],
      httpClient: fetch,
      tokenCache: this.tokenCache,
    };

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withPasswordFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware(this.loggerMiddlewareOptions)
      .build();

    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PROJECT_KEY,
    });

    return apiRoot;
  }

  private withRefreshTokenFlow(): ByProjectKeyRequestBuilder {
    const options: RefreshAuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      refreshToken: this.tokenCache.get().refreshToken ?? '',
      tokenCache: this.tokenCache,
      httpClient: fetch,
    };

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware(this.loggerMiddlewareOptions)
      .build();

    return this.createApiRootFromClient(client);
  }
}

const apiRoot: ApiRoot = new ApiRoot(new InMemoryTokenCache());

export { apiRoot };
