import type {
  ClientResponse,
  Customer,
  CustomerChangePassword,
  CustomerSignInResult,
  CustomerUpdate,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { apiRoot } from '@services';
import type { RegistrationType, SignInType } from '@ts-types';

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

  private async requestMeInfo(): Promise<ClientResponse<Customer>> {
    return await apiRoot.root().me().get().execute();
  }
}
