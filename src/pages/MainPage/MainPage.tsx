import { Typography } from '@mui/material';
import { CustomerContext } from 'context/customer.context';
import { use } from 'react';
import { theme } from 'theme';

export const MainPage = () => {
  const { currentCustomer } = use(CustomerContext)!;
  return (
    <div>
      <Typography variant="h2">Main Page</Typography>
      <Typography>
        Hello{' '}
        <span style={{ color: theme.palette.primary.main }}>
          {currentCustomer?.firstName ?? 'Guest'}
        </span>
      </Typography>
    </div>
  );
};
