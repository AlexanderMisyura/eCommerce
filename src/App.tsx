import { Footer, Header } from '@components';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="page flex min-h-screen flex-col">
      <Header />
      <main className="grow py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
