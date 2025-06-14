import { cartController } from '@controllers';
import { useAppDataContext } from '@hooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import type { LegoProduct } from '@ts-interfaces';
import { useEffect, useState } from 'react';

export const CartActionPanel = ({ product }: { product: LegoProduct }) => {
  const { cart, setCart } = useAppDataContext();
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const lineItem = cart?.lineItems.find((item) => item.productId === product.id);
    setQuantity(lineItem?.quantity ?? 0);
  }, [cart, product.id]);

  const addProductToCart = async () => {
    setIsLoading(true);
    const updatedCart = await cartController.addProductToCart(product.id, cart);
    setCart(updatedCart);
    setIsLoading(false);
  };

  const changeProductQuantity = async (newQuantity: number) => {
    if (!cart) return;

    const lineItem = cart.lineItems.find((item) => item.productId === product.id);

    if (!lineItem) return;

    setIsLoading(true);
    const updatedCart = await cartController.changeProductQuantity(lineItem.id, newQuantity, cart);
    setCart(updatedCart);
    setIsLoading(false);
  };

  return (
    <>
      {quantity === 0 ? (
        <Button
          loading={isLoading}
          variant="contained"
          color="success"
          size="large"
          onClick={() => void addProductToCart()}
        >
          Add to cart
        </Button>
      ) : (
        <ButtonGroup variant="contained" color="success" size="large">
          <Button loading={isLoading} onClick={() => void changeProductQuantity(quantity - 1)}>
            {quantity === 1 ? <DeleteIcon /> : <RemoveCircleIcon />}
          </Button>
          <Box sx={{ px: 5.5, py: 2, fontWeight: 'bold', userSelect: 'none' }}>{quantity}</Box>
          <Button loading={isLoading} onClick={() => void changeProductQuantity(quantity + 1)}>
            <AddCircleIcon />
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
