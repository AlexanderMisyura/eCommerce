import {
  type ByProjectKeyRequestBuilder,
  type ClientRequest,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  type Client,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type LoggerMiddlewareOptions,
  type MiddlewareResponse,
  type RefreshAuthMiddlewareOptions,
  type TokenStore,
} from '@commercetools/ts-client';
import CTP_CONFIG from '@config/ctp-api-client-config';
import { anonymousIdService } from '@services';

import { LocalStorageTokenCache } from './local-storage-token-cache';

const { PROJECT_KEY, CLIENT_SECRET, CLIENT_ID, AUTH_URL, API_URL, SCOPES } = CTP_CONFIG;

class ApiRoot {
  private tokenCache: LocalStorageTokenCache;
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
    enableRetry: true,
    retryConfig: {
      maxRetries: 3,
      retryDelay: 200,
      backoff: false,
      retryCodes: [500, 503],
    },
    httpClient: fetch,
  };

  private concurrentModificationMiddlewareOptions = {
    concurrentModificationHandlerFn: (version: number, request: ClientRequest) => {
      console.log(
        `%cConcurrent modification, retry with version ${version}`,
        'background: aqua; font-size: large; font-weight: bold; padding: 5px 15px; border-radius: 5px;'
      );

      const body = request.body as Record<string, unknown>;
      body.version = version;

      return Promise.resolve(body);
    },
  };

  constructor() {
    this.tokenCache = new LocalStorageTokenCache();
  }

  public root(): ByProjectKeyRequestBuilder {
    if (this.tokenCache.getRefreshToken()) {
      return this.withRefreshTokenFlow();
    }

    return this.withAnonymousTokenFlow();
  }

  public saveToken(token: TokenStore): void {
    this.tokenCache.set(token);
  }

  public reset(): void {
    this.tokenCache.reset();
    anonymousIdService.resetAnonymousId();
  }

  public isTokenExist(): boolean {
    return this.tokenCache.isExist();
  }

  private createApiRootFromClient(client: Client): ByProjectKeyRequestBuilder {
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PROJECT_KEY,
    });
  }

  private withAnonymousTokenFlow(): ByProjectKeyRequestBuilder {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        anonymousId: anonymousIdService.getAnonymousId(),
      },
      scopes: [SCOPES],
      httpClient: fetch,
      tokenCache: this.tokenCache,
    };

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware(this.loggerMiddlewareOptions)
      .withConcurrentModificationMiddleware(this.concurrentModificationMiddlewareOptions)
      .build();

    return this.createApiRootFromClient(client);
  }

  private withRefreshTokenFlow(): ByProjectKeyRequestBuilder {
    const refreshToken = this.tokenCache.getRefreshToken();
    if (!refreshToken) {
      return this.withAnonymousTokenFlow();
    }

    const options: RefreshAuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      refreshToken,
      tokenCache: this.tokenCache,
      httpClient: fetch,
    };

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware(this.loggerMiddlewareOptions)
      .withConcurrentModificationMiddleware(this.concurrentModificationMiddlewareOptions)
      .build();

    return this.createApiRootFromClient(client);
  }
}

const apiRoot: ApiRoot = new ApiRoot();

export { apiRoot };
