import type { Cart, Customer } from '@commercetools/platform-sdk';
import { Footer, Header, Spinner } from '@components';
import { useCustomerContext } from '@hooks';
import { UrlPath } from '@ts-enums';
import { useEffect } from 'react';
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from 'react-router';

function App() {
  const { setCurrentCustomer, setCart, setLoading } = useCustomerContext();
  const customerFullData = useRouteLoaderData<{
    customer: Customer | undefined;
    cart: Cart;
  }>('app-root');

  const navigation = useNavigation();
  const location = useLocation();

  const isCatalogPage =
    navigation.location?.pathname.includes(UrlPath.CATALOG) &&
    location.pathname.includes(UrlPath.CATALOG);

  const isNewPageLoading =
    navigation.state === 'loading' && navigation.location.pathname !== location.pathname;

  useEffect(() => {
    setLoading(false);

    if (customerFullData?.customer) {
      setCurrentCustomer(customerFullData.customer);
    }

    if (customerFullData?.cart) {
      setCart(customerFullData.cart);
    }
  }, [customerFullData, setCurrentCustomer, setCart, setLoading]);

  return (
    <>
      <div className="page flex min-h-screen flex-col">
        <Header />
        <main className="flex grow flex-col py-4">
          {isNewPageLoading && !isCatalogPage ? <Spinner /> : <Outlet />}
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </>
  );
}

export default App;
