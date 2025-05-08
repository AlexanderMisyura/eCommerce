import { Navigation } from '@components/index';
import { AboutUsPage, MainPage, RegistrationPage, SignInPage } from '@pages/index';
import { NotFoundPage } from '@pages/not-found/not-found.page';
import { UrlPath } from 'enum/url-path';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Navigation,
    children: [
      { path: UrlPath.home, Component: MainPage },
      { path: UrlPath.about, Component: AboutUsPage },
      { path: UrlPath.signIn, Component: SignInPage },
      { path: UrlPath.registration, Component: RegistrationPage },
      { path: UrlPath.notFound, Component: NotFoundPage },
    ],
  },
]);
