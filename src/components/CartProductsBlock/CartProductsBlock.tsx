import type { Cart } from '@commercetools/platform-sdk';
import { CartItem } from '@components';
import { controller } from '@controllers';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { formatPrice } from '@utils';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

const style = {
  py: 0,
  width: 'auto',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  display: 'flex',
  flexDirection: 'column',
};

export const CartProductsBlock = ({
  cart,
  setCart,
}: {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
}) => {
  const [isCartClearing, setIsCartClearing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  if (cart === null || cart.lineItems.length === 0) return;

  const handleClearCart = () => {
    if (!cart) return;
    setIsCartClearing(true);

    void controller.deleteCart(cart.id, cart.version);
    setTimeout(() => {
      setCart(null);
      setIsCartClearing(false);
    }, 500);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const { totalPrice, lineItems } = cart;
  const totalQuantity = lineItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Box
        sx={{
          px: 4,
          py: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          mb: 2,
          backgroundColor: 'background.paper',
          alignSelf: 'stretch',
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
            <Typography color="warning" variant="h2">
              Total price: {formatPrice(totalPrice?.centAmount)}
            </Typography>
            <Typography variant="h2">Total quantity: {totalQuantity}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              loading={isCartClearing}
              onClick={handleOpenModal}
            >
              Clear cart
            </Button>
            <Button disabled variant="contained" color="primary" size="large" sx={{ paddingX: 10 }}>
              Pay now
            </Button>
          </Box>
        </Stack>
      </Box>
      <List sx={style}>
        {lineItems.map((item) => (
          <Fragment key={item.id}>
            <ListItem>
              <CartItem item={item} />
            </ListItem>
            <Divider variant="middle" component="li" />
          </Fragment>
        ))}
      </List>
      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        sx={{ textAlign: 'center' }}
        disableRestoreFocus
      >
        <DialogContent sx={{ p: 4, maxWidth: '350px' }}>
          <Typography>Are you sure you want to clear your cart?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
            <Button loading={isCartClearing} color="error" onClick={handleClearCart}>
              Clear
            </Button>
            <Button loading={isCartClearing} onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
