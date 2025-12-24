import { CartDiscount, CartEmpty, CartProductsBlock } from '@components';
import { TITLE } from '@constants';
import { useAppDataContext } from '@hooks';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from 'theme';

export const ShoppingCartPage = () => {
  const { cart, setCart } = useAppDataContext();

  return (
    <>
      <title>{`Cart | ${TITLE}`}</title>

      <Container
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          rowGap: theme.spacing(8),
        }}
      >
        {cart?.lineItems.length ? (
          <Box display="flex" flexDirection="column" gap={4}>
            <CartDiscount />
            <CartProductsBlock cart={cart} setCart={setCart} />
          </Box>
        ) : (
          <CartEmpty />
        )}
      </Container>
    </>
  );
};
