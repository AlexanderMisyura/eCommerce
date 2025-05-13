import { Footer, Header } from '@components';
import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router';
import { theme } from 'theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="grow">
            <Container>
              <Outlet />
            </Container>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
