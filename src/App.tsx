import { Footer, Header } from '@components';
import { ApiController } from '@controllers';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
const initializedToken = async () => {
  await ApiController.getInstance().prepareRequestProject();
};
function App() {
  useEffect(() => {
    initializedToken().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <div className="page flex min-h-screen flex-col">
        <Header />
        <main className="flex grow flex-col py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </>
  );
}

export default App;
