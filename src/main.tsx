import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/global.css';

import { CssBaseline } from '@mui/material';
import { CustomerProvider } from 'context/customer.context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'router';

const root = document.createElement('div');
root.id = 'root';
root.classList.add('flex', 'flex-col', 'min-h-screen');
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <CustomerProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CustomerProvider>
  </StrictMode>
);
