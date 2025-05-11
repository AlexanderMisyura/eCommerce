import {
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type LoggerMiddlewareOptions,
  type MiddlewareResponse,
  type PasswordAuthMiddlewareOptions,
  type TokenCache,
} from '@commercetools/ts-client';
import CTP_CONFIG from '@config/ctp-api-client-config';
import type { SignInType } from '@ts-types';

import { InMemoryTokenCache } from './in-memory-token-cache';

const { PROJECT_KEY, CLIENT_SECRET, CLIENT_ID, AUTH_URL, API_URL, SCOPES } = CTP_CONFIG;

class ApiRoot {
  private userData: SignInType | null;
  private tokenCache?: TokenCache;

  constructor(tokenCache: TokenCache) {
    this.userData = null;
    this.tokenCache = tokenCache;
  }

  public root(): ByProjectKeyRequestBuilder {
    console.log(this.userData);
    return this.userData ? this.withPasswordFlow() : this.withClientCredentialsFlow();
  }

  public setUserData(value: SignInType): void {
    this.userData = value;
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
      scopes: [`manage_project:${PROJECT_KEY}`],
      httpClient: fetch,
      tokenCache: this.tokenCache,
    };

    const loggerMiddlewareOptions: LoggerMiddlewareOptions = {
      loggerFn: (response: MiddlewareResponse) => {
        console.log('Response is:', response);
      },
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
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

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware(loggerMiddlewareOptions)
      .build();

    console.log('token:', this.tokenCache);

    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PROJECT_KEY,
    });

    return apiRoot;
  }

  private withClientCredentialsFlow(): ByProjectKeyRequestBuilder {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET },
      scopes: [SCOPES],
      httpClient: fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
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

    const loggerMiddlewareOptions: LoggerMiddlewareOptions = {
      loggerFn: (response: MiddlewareResponse) => {
        console.log('Response is:', response);
      },
    };

    console.log('userData', this.userData);

    const client = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware(loggerMiddlewareOptions)
      .build();

    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: PROJECT_KEY,
    });

    return apiRoot;
  }
}

const apiRoot: ApiRoot = new ApiRoot(new InMemoryTokenCache());

export { apiRoot };
