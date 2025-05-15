import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { CustomerContext } from 'context/customer.context';
import { use } from 'react';
import { theme } from 'theme';

export const MainPage = () => {
  const { currentCustomer } = use(CustomerContext)!;
  return (
    <Container>
      <Typography variant="h2">Main Page</Typography>
      <Typography>
        Hello{' '}
        <span style={{ color: theme.palette.primary.main }}>
          {currentCustomer?.firstName ?? 'Guest'}
        </span>
      </Typography>
    </Container>
  );
};
