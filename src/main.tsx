import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/global.css';

import { CssBaseline } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CustomerProvider } from 'context/customer.context';
import { RegistrationDataProvider } from 'context/registration.provider';
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomerProvider>
        <RegistrationDataProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </RegistrationDataProvider>
      </CustomerProvider>
    </LocalizationProvider>
  </StrictMode>
);
