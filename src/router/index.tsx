import {
  ProductCards,
  Spinner,
  UserProfileAddresses,
  UserProfileChangePassword,
  UserProfileCredentials,
  UserProfileOverview,
} from '@components';
import {
  AboutUsPage,
  CatalogPage,
  ErrorPage,
  MainPage,
  ProductPage,
  RegistrationPage,
  ShoppingCartPage,
  SignInPage,
  UserProfilePage,
} from '@pages';
import { UrlPath } from '@ts-enums';
import {
  categoriesLoader,
  productDetailsLoader,
  productsLoader,
  registrationAction,
  signInAction,
} from '@utils';
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
          {
            path: UrlPath.CATALOG,
            Component: CatalogPage,
            loader: categoriesLoader,
            id: 'catalog',
            children: [
              { index: true, loader: () => redirect(`/${UrlPath.CATALOG_ALL}`) },
              {
                path: '*',
                id: 'product-list',
                Component: ProductCards,
                loader: productsLoader,
                HydrateFallback: Spinner,
              },
            ],
          },
          { path: UrlPath.SHOPPING_CART, Component: ShoppingCartPage },
          {
            path: UrlPath.PRODUCT,
            children: [
              { index: true, loader: () => redirect(`/${UrlPath.CATALOG_ALL}`) },
              {
                path: ':productSlug',
                loader: productDetailsLoader,
                Component: ProductPage,
                HydrateFallback: Spinner,
              },
            ],
          },
          { path: UrlPath.NOT_FOUND, Component: ErrorPage },
        ],
      },
    ],
  },
]);
