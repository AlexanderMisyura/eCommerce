import { apiRoot } from '@services/ctp-api-client.service';

export const requestLogOut = () => {
  apiRoot.reset();
};
