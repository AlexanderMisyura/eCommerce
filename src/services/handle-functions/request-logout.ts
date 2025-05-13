import { apiRoot } from '@services';

export const requestLogOut = () => {
  apiRoot.reset();
};
