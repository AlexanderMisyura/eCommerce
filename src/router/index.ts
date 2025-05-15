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
      { path: UrlPath.USER_PROFILE, Component: UserProfilePage },
      { path: UrlPath.CATALOG, Component: CatalogPage },
      { path: UrlPath.SHOPPING_CART, Component: ShoppingCartPage },
    ],
  },
]);
