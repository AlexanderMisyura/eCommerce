import { apiRoot } from '@services';
import type { SignInType } from '@ts-types';

export const requestSignInApp = async (value: SignInType) => {
  return await apiRoot.root().login().post({ body: value }).execute();
};
