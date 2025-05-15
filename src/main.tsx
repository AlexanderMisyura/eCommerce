import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/global.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { CustomerProvider } from 'context/customer.context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'router';
import { theme } from 'theme';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomerProvider>
        <RouterProvider router={router} />
      </CustomerProvider>
    </ThemeProvider>
  </StrictMode>
);
