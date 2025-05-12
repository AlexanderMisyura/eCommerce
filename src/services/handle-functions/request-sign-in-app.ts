import { apiRoot } from '@services/ctp-api-client.service';
import type { SignInType } from '@ts-types';

export const requestSignInApp = async (value: SignInType) => {
  return await apiRoot.root().login().post({ body: value }).execute();
};
