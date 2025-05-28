import type {
  Category,
  ClientResponse,
  Customer,
  CustomerChangePassword,
  CustomerSignInResult,
  CustomerUpdate,
  CustomerUpdateAction,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { CATEGORY } from '@constants';
import { apiRoot } from '@services';
import type { QueryOptions } from '@ts-interfaces';
import type { RegistrationType, SignInType } from '@ts-types';
import { createProductQuery } from 'utils/create-product-query';

export class ApiController {
  private static instance: ApiController;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): ApiController {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController();
    }
    return ApiController.instance;
  }

  public async registerCustomer(
    customer: RegistrationType
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const response = await apiRoot.root().customers().post({ body: customer }).execute();
    apiRoot.setUserData(customer);
    await this.requestMeInfo();

    return response;
  }

  public async signInCustomer(customer: SignInType): Promise<ClientResponse<CustomerSignInResult>> {
    const response = await apiRoot.root().login().post({ body: customer }).execute();
    apiRoot.setUserData(customer);
    await this.requestMeInfo();

    return response;
  }

  public async changePasswordCustomer({
    id,
    version,
    currentPassword,
    newPassword,
  }: CustomerChangePassword): Promise<ClientResponse<Customer>> {
    const response = await apiRoot
      .root()
      .customers()
      .password()
      .post({ body: { id, version, currentPassword, newPassword } })
      .execute();
    return response;
  }

  public async updateCustomer(payload: {
    id: string;
    version: number;
    actions: CustomerUpdateAction[];
  }): Promise<ClientResponse<Customer>> {
    const body: CustomerUpdate = {
      version: payload.version,
      actions: payload.actions,
    };

    const response = await apiRoot
      .root()
      .customers()
      .withId({ ID: payload.id })
      .post({ body })
      .execute();

    return response;
  }

  public logoutCustomer(): void {
    apiRoot.reset();
  }

  public async getCategories(): Promise<Category[]> {
    const response = await apiRoot
      .root()
      .categories()
      .get({
        queryArgs: {
          where: `name(en-US in ("${CATEGORY.BATMAN}", "${CATEGORY.LOTR}", "${CATEGORY.STAR_WARS}", "${CATEGORY.TECHNIC}"))`,
        },
      })
      .execute();

    return response.body.results;
  }

  public async getProducts(
    options: QueryOptions
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    const query = createProductQuery(options);

    return await apiRoot.root().productProjections().search().get({ queryArgs: query }).execute();
  }

  public async getProductBySlug(
    slug: string
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return await apiRoot
      .root()
      .productProjections()
      .get({ queryArgs: { where: `slug(en-US = "${slug}")` } })
      .execute();
  }

  private async requestMeInfo(): Promise<ClientResponse<Customer>> {
    return await apiRoot.root().me().get().execute();
  }
}
