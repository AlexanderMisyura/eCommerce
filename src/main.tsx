import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/global.css';

import { AppDataProvider, RegistrationDataProvider, ToastProvider } from '@context';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'router';
import { theme } from 'theme';

const root = document.createElement('div');
root.id = 'root';
root.classList.add('h-full');
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppDataProvider>
          <RegistrationDataProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </RegistrationDataProvider>
        </AppDataProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>
);
