import { cartController, controller } from '@controllers';
import { useCustomerContext } from '@hooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button, ButtonGroup } from '@mui/material';
import type { LegoProduct } from '@ts-interfaces';
import { useEffect, useState } from 'react';

export const CartActionPanel = ({ product }: { product: LegoProduct }) => {
  const { cart, setCart } = useCustomerContext();
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLastCart = async () => {
      if (!cart) return;
      const lastCart = await controller.getLastVersionCart(cart.id);
      if (lastCart.version === cart.version) return;
      setCart(lastCart);
    };
    void getLastCart();
  }, [cart, setCart]);

  useEffect(() => {
    if (cart) {
      const lineItem = cart.lineItems.find((item) => item.productId === product.id);
      if (lineItem) {
        setQuantity(lineItem.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [cart, product.id]);

  const addProductToCart = async () => {
    if (!cart) return;
    const response = await cartController.addProductToCart(product.id, 1, cart);
    setCart(response);
  };
  const changeProductQuantity = async (number: number) => {
    setIsLoading(true);
    if (!cart) return;
    const lineItem = cart.lineItems.find((item) => item.productId === product.id);
    if (!lineItem) return;
    const response = await cartController.changeProductQuantity(lineItem.id, number, cart);
    setCart(response);
    setIsLoading(false);
  };
  return (
    <>
      {!quantity || quantity === 0 ? (
        <Button
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
          <Button disabled>{quantity}</Button>
          <Button loading={isLoading} onClick={() => void changeProductQuantity(quantity + 1)}>
            <AddCircleIcon />
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
