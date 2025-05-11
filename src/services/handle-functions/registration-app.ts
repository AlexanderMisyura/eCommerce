import { apiRoot } from '@services/ctp-api-client.service';
import type { RegistrationType, SignInType } from '@ts-types';

export const registrationApp = async (value: RegistrationType) => {
  const data = await apiRoot.root().customers().post({ body: value }).execute();

  console.log(data);
  return data;
};

export const authUserApp = async (userData: SignInType) => {
  const data = await apiRoot.root().login().post({ body: userData }).execute();
  console.log(data);
  return data;
};
