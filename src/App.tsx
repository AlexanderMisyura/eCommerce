import { Navigation } from '@components';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router';
import { theme } from 'theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
