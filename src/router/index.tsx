import { ProductCards, Spinner } from '@components';
import {
  AboutUsPage,
  CatalogPage,
  ErrorPage,
  MainPage,
  RegistrationPage,
  ShoppingCartPage,
  SignInPage,
  UserProfilePage,
} from '@pages';
import { UrlPath } from '@ts-enums';
import { productsLoader, registrationAction, signInAction } from '@utils';
import App from 'App';
import { createBrowserRouter, redirect } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: UrlPath.HOME, Component: MainPage },
          { path: UrlPath.ABOUT, Component: AboutUsPage },
          { path: UrlPath.SIGN_IN, Component: SignInPage, action: signInAction },
          { path: UrlPath.REGISTRATION, Component: RegistrationPage, action: registrationAction },
          { path: UrlPath.USER_PROFILE, Component: UserProfilePage },
          {
            path: UrlPath.CATALOG,
            Component: CatalogPage,
            children: [
              { index: true, loader: () => redirect(`/${UrlPath.CATALOG_ALL}`) },
              {
                path: ':categorySlug',
                Component: ProductCards,
                loader: productsLoader,
                HydrateFallback: Spinner,
              },
            ],
          },
          { path: UrlPath.SHOPPING_CART, Component: ShoppingCartPage },
          { path: UrlPath.NOT_FOUND, Component: ErrorPage },
        ],
      },
    ],
  },
]);
