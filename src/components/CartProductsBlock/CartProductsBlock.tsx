import type { Cart } from '@commercetools/platform-sdk';
import { CartItem } from '@components';
import { Box, Button, Divider, List, ListItem, Stack, Typography } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';

const style = {
  py: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export const CartProductsBlock = ({ cart }: { cart: Cart | null }) => {
  if (cart === null) return <h2>Cart is empty</h2>;
  if (cart.lineItems.length === 0) return <h2>Cart is empty</h2>;
  const { totalPrice, lineItems } = cart;
  const totalQuantity = lineItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box>
      <Box
        sx={{
          px: 4,
          py: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          mb: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Stack
          direction="column"
          sx={{
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            gap: { xs: 5, sm: 5 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 10 },
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h2">Total price: {totalPrice?.centAmount / 100} $</Typography>
            <Typography variant="h2">Total quantity: {totalQuantity}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
            <Button variant="contained" color="error" size="small">
              Reset cart
            </Button>
            <Button variant="contained" color="primary" size="large" sx={{ paddingX: 10 }}>
              Pay now
            </Button>
          </Box>
        </Stack>
      </Box>
      <List sx={style}>
        {lineItems.map((item) => (
          <Fragment key={item.id}>
            <ListItem key={item.id}>
              <CartItem item={item} />
            </ListItem>
            <Divider variant="middle" component="li" />
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
