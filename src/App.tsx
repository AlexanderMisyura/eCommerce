import { Footer, Header, Spinner } from '@components';
import { UrlPath } from '@ts-enums';
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router';

function App() {
  const navigation = useNavigation();
  const location = useLocation();

  const isCatalogPage =
    navigation.location?.pathname.includes(UrlPath.CATALOG) &&
    location.pathname.includes(UrlPath.CATALOG);

  const isNewPageLoading =
    navigation.state === 'loading' && navigation.location.pathname !== location.pathname;

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
