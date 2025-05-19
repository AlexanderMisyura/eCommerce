import { useCustomerContext } from '@hooks/use-customer-context';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { theme } from 'theme';

export const MainPage = () => {
  const { currentCustomer } = useCustomerContext();
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(4),
      }}
    >
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
