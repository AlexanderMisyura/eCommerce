import { type ClientResponse, type CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from '@services/ctp-api-client.service';
import { type RegistrationType } from '@ts-types';

export const registrationApp = async (
  value: RegistrationType
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await apiRoot.root().customers().post({ body: value }).execute();
};
