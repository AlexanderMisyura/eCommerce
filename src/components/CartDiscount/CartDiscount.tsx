import type { Cart } from '@commercetools/platform-sdk';
import { Spinner } from '@components';
import { useAppDataContext, useToast } from '@hooks';
import DiscountIcon from '@mui/icons-material/Discount';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CartAction, UrlPath } from '@ts-enums';
import { useEffect, useRef, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import { ZodError } from 'zod';

export const CartDiscount = () => {
  const preloadedCart = useLoaderData<Cart>();
  const fetcher = useFetcher<Cart>();
  const inputReference = useRef<HTMLInputElement>(null);
  const { cart, setCart } = useAppDataContext();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showToast } = useToast();

  const cartId = cart?.id;
  const cartVersion = cart?.version;

  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (preloadedCart) {
      setCart(preloadedCart);
    }
  }, [preloadedCart, setCart]);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data instanceof ZodError) {
        showToast(fetcher.data.errors[0].message, 'warning');
        return;
      } else if (fetcher.data instanceof Error) {
        showToast(fetcher.data.message, 'warning');
        return;
      }

      setCart(fetcher.data);

      if (inputReference.current) {
        inputReference.current.value = '';
      }
    }
  }, [fetcher.data, setCart, showToast]);

  if (!cart) {
    return <Spinner />;
  }

  const submitDiscount = () => {
    if (!inputReference.current || !cartId || !cartVersion) return;

    const discountCode = inputReference.current.value.trim();

    if (!discountCode) {
      setErrorMessage('Discount code cannot be empty');
      return;
    }

    const addDiscountAction = {
      action: CartAction.ADD_DISCOUNT_CODE,
      code: discountCode,
    };

    const submission = {
      ID: cart.id,
      version: cart.version,
      action: addDiscountAction,
    };

    void fetcher.submit(submission, {
      action: `/${UrlPath.SHOPPING_CART}`,
      method: 'post',
      encType: 'application/json',
    });
  };

  const removeDiscount = (discountId: string) => {
    if (!cartId || !cartVersion) return;

    const removeDiscountAction = {
      action: CartAction.REMOVE_DISCOUNT_CODE,
      discountCode: {
        typeId: 'discount-code',
        id: discountId,
      },
    };

    const submission = {
      ID: cart.id,
      version: cart.version,
      action: removeDiscountAction,
    };

    void fetcher.submit(submission, {
      action: `/${UrlPath.SHOPPING_CART}`,
      method: 'post',
      encType: 'application/json',
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={8} mb={8}>
      <Box display="flex" justifyContent="center" gap={{ xs: 4, sm: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <DiscountIcon color={isLoading ? 'disabled' : 'error'} sx={{ mr: 1, my: 0.5 }} />
          <TextField
            slotProps={{ inputLabel: { color: 'warning' } }}
            inputRef={inputReference}
            label="Paste Your Code"
            variant="standard"
            disabled={isLoading}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            onBlur={() => setErrorMessage('')}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            onClick={submitDiscount}
            color="warning"
            type="button"
            variant="contained"
            loading={isLoading}
          >
            Apply Coupon
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        {cart?.discountCodes.map((discount) => (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            key={discount.discountCode.id}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Chip
              label={discount.discountCode.obj?.name?.['en-US']}
              color="error"
              onDelete={() => removeDiscount(discount.discountCode.id)}
              sx={{ border: '1px dashed lightgray' }}
            />
            {discount.discountCode.obj?.description?.['en-US'] && (
              <Chip
                label={discount.discountCode.obj?.description['en-US']}
                sx={{
                  backgroundColor: 'white',
                  border: '1px dashed lightgray',
                  fontSize: '0.7rem',
                }}
              ></Chip>
            )}
          </Stack>
        ))}
      </Box>
    </Box>
  );
};
