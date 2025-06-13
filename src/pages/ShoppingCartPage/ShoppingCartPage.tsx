import { CartDiscount, CartEmpty } from '@components';
import { controller } from '@controllers';
import { useAppDataContext } from '@hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { formatPrice } from '@utils';
import { theme } from 'theme';

export const ShoppingCartPage = () => {
  const { cart, setCart } = useAppDataContext();

  const handleClearCart = () => {
    if (!cart) return;

    void controller.deleteCart(cart.id, cart.version);

    setCart(null);
  };

  return (
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
          <Typography fontWeight="bold">
            Cart total: {`$${cart.totalPrice.centAmount / 100}`}
          </Typography>
          {cart?.lineItems.map((item) => {
            const cartDiscountPrice =
              item.discountedPricePerQuantity[0]?.discountedPrice.value.centAmount;
            const price = item.price.value.centAmount;
            const itemDiscountPrice = item.price.discounted?.value.centAmount;

            const displayedPrice = cartDiscountPrice ?? itemDiscountPrice ?? price;

            return (
              <Box display="flex" flexDirection="column" key={item.id}>
                <div>{item.name['en-US']}</div>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    color={cartDiscountPrice || itemDiscountPrice ? 'error' : 'warning'}
                    fontWeight="bold"
                  >
                    {formatPrice(displayedPrice)}
                  </Typography>

                  {(cartDiscountPrice || itemDiscountPrice) && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1, textDecoration: 'line-through' }}
                    >
                      {formatPrice(price)}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
          <Box display="flex" justifyContent="center">
            <Button onClick={handleClearCart} variant="contained" color="error">
              Clear Cart
            </Button>
          </Box>
        </Box>
      ) : (
        <CartEmpty />
      )}
    </Container>
  );
};
