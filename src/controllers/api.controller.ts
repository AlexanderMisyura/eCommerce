import type {
  Category,
  ClientResponse,
  Customer,
  CustomerChangePassword,
  CustomerSignInResult,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
  Project,
} from '@commercetools/platform-sdk';
import { CATEGORY } from '@constants';
import { apiRoot } from '@services';
import type { QueryOptions, UserAddress, UserAddressType } from '@ts-interfaces';
import type { RegistrationType, SignInType } from '@ts-types';
import { createProductQuery } from 'utils/create-product-query';

export class ApiController {
  private static instance: ApiController;

  public static getInstance(): ApiController {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController();
    }
    return ApiController.instance;
  }

  public async getCart() {
    const response = await apiRoot
      .root()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
    console.log({ response });
  }

  public async registerCustomer(
    customer: RegistrationType
  ): Promise<ClientResponse<CustomerSignInResult>> {
    apiRoot.setUserData(customer);
    const response = await apiRoot.root().customers().post({ body: customer }).execute();
    if (response) apiRoot.resetUser();
    return response;
  }

  public async signInCustomer(customer: SignInType): Promise<ClientResponse<CustomerSignInResult>> {
    apiRoot.setUserData(customer);
    const response = await apiRoot.root().login().post({ body: customer }).execute();
    if (response) apiRoot.resetUser();
    return response;
  }

  public async changePasswordCustomer({
    version,
    currentPassword,
    newPassword,
  }: CustomerChangePassword): Promise<ClientResponse<Customer>> {
    const response = await apiRoot
      .root()
      .me()
      .password()
      .post({ body: { version, currentPassword, newPassword } })
      .execute();
    return response;
  }

  public async updateCustomer(payload: {
    version: number;
    actions: MyCustomerUpdateAction[];
  }): Promise<ClientResponse<Customer>> {
    const body: MyCustomerUpdate = {
      version: payload.version,
      actions: payload.actions,
    };

    const response = await apiRoot.root().me().post({ body }).execute();
    return response;
  }

  public logoutCustomer(): void {
    apiRoot.reset();
  }

  public async requestMeInfo(): Promise<ClientResponse<Customer>> {
    return await apiRoot.root().me().get().execute();
  }

  public async prepareRequestProject(): Promise<ClientResponse<Project> | undefined> {
    if (!apiRoot.isTokenExist()) {
      return await apiRoot.root().get().execute();
    }
  }

  public async getCategories(): Promise<Category[]> {
    const response = await apiRoot
      .root()
      .categories()
      .get({
        queryArgs: {
          where: `name(en-US in ("${CATEGORY.BATMAN}", "${CATEGORY.LOTR}", "${CATEGORY.STAR_WARS}", "${CATEGORY.TECHNIC}", "${CATEGORY.SPACESHIPS}", "${CATEGORY.CARS}"))`,
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

  /* ADDRESSES */
  public async addCustomerAddress({
    version,
    address,
    addressType,
  }: {
    version: number;
    address: UserAddress;
    addressType: UserAddressType;
  }): Promise<ClientResponse<Customer>> {
    const response = await apiRoot
      .root()
      .me()
      .post({
        body: {
          version: version,
          actions: [{ action: 'addAddress', address: address }],
        },
      })
      .execute();

    const updateCustomer = response.body;
    const newAddress = updateCustomer.addresses.at(-1);

    if (!newAddress?.id) {
      throw new Error('Failed to add address. Customer version: ${version}.');
    }

    const actions: MyCustomerUpdateAction[] = [];

    if (addressType.useAsShipping) {
      actions.push({
        action: 'addShippingAddressId',
        addressId: newAddress.id,
      });
    }

    if (addressType.useAsBilling) {
      actions.push({
        action: 'addBillingAddressId',
        addressId: newAddress.id,
      });
    }

    if (addressType.setAsDefaultShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: newAddress.id,
      });
    }

    if (addressType.setAsDefaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: newAddress.id,
      });
    }

    if (actions.length === 0) return response;

    const finalResponse = await apiRoot
      .root()
      .me()
      .post({ body: { version: updateCustomer.version, actions } })
      .execute();

    return finalResponse;
  }

  public async removeCustomerAddress({
    version,
    addressId,
  }: {
    version: number;
    addressId: string;
  }): Promise<ClientResponse<Customer>> {
    const response = await apiRoot
      .root()
      .me()
      .post({ body: { version, actions: [{ action: 'removeAddress', addressId }] } })
      .execute();

    return response;
  }

  public async changeCustomerAddress({
    version,
    addressId,
    address,
    addressType,
  }: {
    version: number;
    addressId: string;
    address: UserAddress;
    addressType: UserAddressType;
  }): Promise<ClientResponse<Customer>> {
    const initialResponse = await apiRoot
      .root()
      .me()
      .post({
        body: { version, actions: [{ action: 'changeAddress', addressId, address }] },
      })
      .execute();

    const updateCustomer = initialResponse.body;
    const changedAddress = updateCustomer.addresses.find((addr) => addr.id === addressId);

    if (!changedAddress?.id) {
      throw new Error('Ooops...Something went wrong while editing a new address');
    }

    const actions: MyCustomerUpdateAction[] = [];

    const shouldRemoveShipping =
      !addressType.useAsShipping && updateCustomer.shippingAddressIds?.includes(addressId);

    if (addressType.useAsShipping || shouldRemoveShipping) {
      actions.push({
        action: addressType.useAsShipping ? 'addShippingAddressId' : 'removeShippingAddressId',
        addressId: changedAddress.id,
      });
    }

    const shouldRemoveBilling =
      !addressType.useAsShipping && updateCustomer.billingAddressIds?.includes(addressId);

    if (addressType.useAsBilling || shouldRemoveBilling) {
      actions.push({
        action: addressType.useAsBilling ? 'addBillingAddressId' : 'removeBillingAddressId',
        addressId: changedAddress.id,
      });
    }

    if (addressType.setAsDefaultShipping && updateCustomer.defaultShippingAddressId !== addressId) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: changedAddress.id,
      });
    } else if (
      !addressType.setAsDefaultShipping &&
      addressType.useAsShipping &&
      updateCustomer.defaultShippingAddressId === addressId
    ) {
      throw new Error(
        'To remove the default Shipping address, you must set a different default address'
      );
    }

    if (addressType.setAsDefaultBilling && updateCustomer.defaultBillingAddressId !== addressId) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: changedAddress.id,
      });
    } else if (
      !addressType.setAsDefaultBilling &&
      addressType.useAsBilling &&
      updateCustomer.defaultBillingAddressId === addressId
    ) {
      throw new Error(
        'To remove the default Billing address, you must set a different default address'
      );
    }

    if (actions.length === 0) return initialResponse;

    const finalResponse = await apiRoot
      .root()
      .me()
      .post({ body: { version: updateCustomer.version, actions } })
      .execute();

    return finalResponse;
  }
}
