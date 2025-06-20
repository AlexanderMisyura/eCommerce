import type { Cart, Customer, DiscountCode } from '@commercetools/platform-sdk';
import { Footer, Header, Spinner } from '@components';
import { useAppDataContext } from '@hooks';
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
  const { setCurrentCustomer, setCart, setDiscountCodes, setLoading } = useAppDataContext();
  const appData = useRouteLoaderData<{
    customer: Customer | undefined;
    cart: Cart;
    discountCodes: DiscountCode[];
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

    if (appData?.customer) {
      setCurrentCustomer(appData.customer);
    }

    if (appData?.cart) {
      setCart(appData.cart);
    }

    if (appData?.discountCodes.length) {
      setDiscountCodes(appData.discountCodes);
    }
  }, [appData, setCurrentCustomer, setCart, setDiscountCodes, setLoading]);

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
