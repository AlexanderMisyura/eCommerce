import {
  UserProfileAddresses,
  UserProfileChangePassword,
  UserProfileCredentials,
  UserProfileOverview,
} from '@components';
import {
  AboutUsPage,
  CatalogPage,
  MainPage,
  NotFoundPage,
  RegistrationPage,
  ShoppingCartPage,
  SignInPage,
  UserProfilePage,
} from '@pages';
import { UrlPath } from '@ts-enums';
import { registrationAction, signInAction } from '@utils';
import App from 'App';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: UrlPath.HOME, Component: MainPage },
      { path: UrlPath.ABOUT, Component: AboutUsPage },
      { path: UrlPath.SIGN_IN, Component: SignInPage, action: signInAction },
      { path: UrlPath.REGISTRATION, Component: RegistrationPage, action: registrationAction },
      { path: UrlPath.NOT_FOUND, Component: NotFoundPage },
      {
        path: UrlPath.USER_PROFILE,
        Component: UserProfilePage,
        children: [
          {
            index: true,
            Component: UserProfileOverview,
          },
          {
            path: UrlPath.USER_PROFILE_CREDENTIALS,
            Component: UserProfileCredentials,
          },
          {
            path: UrlPath.USER_PROFILE_ADDRESSES,
            Component: UserProfileAddresses,
          },
          {
            path: UrlPath.USER_PROFILE_CHANGE_PASSWORD,
            Component: UserProfileChangePassword,
          },
        ],
      },
      { path: UrlPath.CATALOG, Component: CatalogPage },
      { path: UrlPath.SHOPPING_CART, Component: ShoppingCartPage },
    ],
  },
]);
