// import { signInAction } from '@components';
import { AboutUsPage, MainPage, NotFoundPage, RegistrationPage, SignInPage } from '@pages';
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
    ],
  },
]);
