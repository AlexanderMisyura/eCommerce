import { Footer, Header } from '@components';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="page flex min-h-screen flex-col">
      <Header />
      <main className="flex grow py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
