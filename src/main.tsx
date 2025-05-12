import './styles/global.css';

import { CustomerProvider } from 'context/customer.context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'router';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <CustomerProvider>
      <RouterProvider router={router} />
    </CustomerProvider>
  </StrictMode>
);
