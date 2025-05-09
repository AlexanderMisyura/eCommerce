import { Spinner } from '@components';
import { AboutUsPage, MainPage, NotFoundPage, RegistrationPage, SignInPage } from '@pages';
import { apiRoot } from '@services/ctp-api-client.service';
import { UrlPath } from '@ts-enums';
import App from 'App';
import { createBrowserRouter } from 'react-router';

async function loader() {
  return await apiRoot.customers().get().execute();
}

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: UrlPath.HOME, Component: MainPage, loader, hydrateFallbackElement: Spinner() },
      { path: UrlPath.ABOUT, Component: AboutUsPage },
      { path: UrlPath.SIGN_IN, Component: SignInPage },
      { path: UrlPath.REGISTRATION, Component: RegistrationPage },
      { path: UrlPath.NOT_FOUND, Component: NotFoundPage },
    ],
  },
]);
