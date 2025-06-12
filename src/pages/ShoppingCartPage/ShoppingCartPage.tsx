import { CartDiscount, CartEmpty } from '@components';
import { useAppDataContext } from '@hooks';
import Container from '@mui/material/Container';
import { theme } from 'theme';

export const ShoppingCartPage = () => {
  const { cart } = useAppDataContext();

  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(8),
      }}
    >
      {cart?.lineItems.length ? <CartDiscount /> : <CartEmpty />}
    </Container>
  );
};
