import { AboutUsPage, MainPage, NotFoundPage, RegistrationPage, SignInPage } from '@pages';
import { UrlPath } from '@ts-enums';
import App from 'App';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: UrlPath.home, Component: MainPage },
      { path: UrlPath.about, Component: AboutUsPage },
      { path: UrlPath.signIn, Component: SignInPage },
      { path: UrlPath.registration, Component: RegistrationPage },
      { path: UrlPath.notFound, Component: NotFoundPage },
    ],
  },
]);
