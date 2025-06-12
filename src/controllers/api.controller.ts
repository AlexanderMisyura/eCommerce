import type {
  Cart,
  Category,
  ClientResponse,
  Customer,
  CustomerChangePassword,
  CustomerSignInResult,
  DiscountCode,
  MyCartUpdateAction,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import CTP_CONFIG from '@config/ctp-api-client-config';
import { CATEGORY } from '@constants';
import { anonymousIdService, apiRoot, InMemoryTokenCache } from '@services';
import { CartAction } from '@ts-enums';
import type { QueryOptions, UserAddress, UserAddressType } from '@ts-interfaces';
import type { RegistrationType, SignInType } from '@ts-types';
import { createProductQuery } from 'utils/create-product-query';

const { PROJECT_KEY, CLIENT_SECRET, CLIENT_ID, AUTH_URL, API_URL, SCOPES } = CTP_CONFIG;

class ApiController {
  /* CUSTOMER */
  public async registerCustomer(
    customer: RegistrationType
  ): Promise<ClientResponse<CustomerSignInResult>> {
    await apiRoot
      .root()
      .customers()
      .post({ body: { ...customer, anonymousId: anonymousIdService.getAnonymousId() } })
      .execute();

    return await this.signInCustomer(customer);
  }

  public async signInCustomer(customer: SignInType): Promise<ClientResponse<CustomerSignInResult>> {
    const temporaryTokenCache = new InMemoryTokenCache();

    const options: PasswordAuthMiddlewareOptions = {
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        user: {
          username: customer.email,
          password: customer.password,
        },
      },
      scopes: [SCOPES],
      httpClient: fetch,
      tokenCache: temporaryTokenCache,
    };

    const temporaryClient = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withPasswordFlow(options)
      .withHttpMiddleware({ host: API_URL, httpClient: fetch })
      .build();

    const temporaryApiRoot = createApiBuilderFromCtpClient(temporaryClient).withProjectKey({
      projectKey: PROJECT_KEY,
    });

    const response = await temporaryApiRoot
      .login()
      .post({ body: { ...customer, anonymousId: anonymousIdService.getAnonymousId() } })
      .execute();

    if (response.statusCode === 200) {
      const newTokenCache = temporaryTokenCache.get();
      apiRoot.saveToken(newTokenCache);
      anonymousIdService.resetAnonymousId();
    }

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

  /* PRODUCTS */
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

  /* APP CONTEXT */
  public async getAppData(): Promise<{
    customer: Customer | null;
    cart: Cart | null;
    discountCodes: DiscountCode[];
  }> {
    let customer: Customer | null = null;

    if (!anonymousIdService.isAnonymousIdExist() && apiRoot.isTokenExist()) {
      const customerResponse = await apiRoot.root().me().get().execute();
      customer = customerResponse.body;
    }

    const cartRequest = apiRoot
      .root()
      .me()
      .carts()
      .get({ queryArgs: { expand: 'discountCodes[*].discountCode' } })
      .execute();

    const discountRequest = apiRoot.root().discountCodes().get().execute();

    const [cartResponse, discountResponse] = await Promise.all([cartRequest, discountRequest]);

    const cart = cartResponse.body.results[0] || null;
    const discountCodes = discountResponse.body.results;

    return { customer, cart, discountCodes };
  }

  /* CART */
  public async updateCart(ID: string, version: number, actions: MyCartUpdateAction[]) {
    const updateResponse = await apiRoot
      .root()
      .me()
      .carts()
      .withId({ ID })
      .post({ body: { version, actions } })
      .execute();

    let cart = updateResponse.body;

    const isDiscountUpdated =
      actions[0].action === CartAction.ADD_DISCOUNT_CODE ||
      actions[0].action === CartAction.REMOVE_DISCOUNT_CODE;

    if (isDiscountUpdated) {
      const cartsResponse = await apiRoot
        .root()
        .me()
        .carts()
        .get({ queryArgs: { expand: 'discountCodes[*].discountCode' } })
        .execute();

      cart = cartsResponse.body.results[0] || null;
    }

    return cart;
  }
}

const controller = new ApiController();

export { controller };
