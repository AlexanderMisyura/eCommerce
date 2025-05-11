import { AboutUsPage, MainPage, NotFoundPage, RegistrationPage, SignInPage } from '@pages';
import { UrlPath } from '@ts-enums';
import App from 'App';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: UrlPath.HOME, Component: MainPage },
      { path: UrlPath.ABOUT, Component: AboutUsPage },
      { path: UrlPath.SIGN_IN, Component: SignInPage },
      { path: UrlPath.REGISTRATION, Component: RegistrationPage },
      { path: UrlPath.NOT_FOUND, Component: NotFoundPage },
    ],
  },
]);
