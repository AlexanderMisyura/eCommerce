import { Footer, Header } from '@components';
import { Outlet, ScrollRestoration } from 'react-router';

function App() {
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
