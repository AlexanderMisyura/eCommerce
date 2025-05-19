import { type ClientResponse, type Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '@services';

export const requestMeInfo = async (): Promise<ClientResponse<Customer>> => {
  return await apiRoot.root().me().get().execute();
};
