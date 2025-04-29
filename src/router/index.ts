import { CartPage } from '@pages/CartPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import App from 'App';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', Component: App, ErrorBoundary: NotFoundPage },
  { path: 'cart', Component: CartPage },
]);
