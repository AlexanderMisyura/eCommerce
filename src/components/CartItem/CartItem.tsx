import noProductsImage from '@assets/images/lego-no-products.webp';
import type { LineItem } from '@commercetools/platform-sdk';
import { Box, Typography } from '@mui/material';
import { formatPrice, transformLineItemToLegoProduct } from '@utils';
import { CartActionPanel } from 'components/CartActionPanel/CartActionPanel';

export const CartItem = ({ item }: { item: LineItem }) => {
  const cartDiscountPrice = item.discountedPricePerQuantity[0]?.discountedPrice.value.centAmount;
  const price = item.price.value.centAmount;
  const itemDiscountPrice = item.price.discounted?.value.centAmount;

  const displayedPrice = cartDiscountPrice ?? itemDiscountPrice ?? price;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' },
        justifyContent: { xs: 'center', sm: 'flex-start' },
        width: '100%',
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '200px',
          height: '200px',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {item.variant.images?.[0] && (
          <img
            className="max-h-full w-full object-cover"
            src={item.variant.images?.[0].url ?? noProductsImage}
            alt={item.name['en-US'] ?? 'Product image'}
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {item.name['en-US']}
        </Typography>
        <Typography variant="body1">Quantity: {item.quantity}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {cartDiscountPrice || itemDiscountPrice ? (
            <>
              <Typography variant="body1">
                Price:{' '}
                <Typography color="error" component="span">
                  {formatPrice(displayedPrice)}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 1, textDecoration: 'line-through' }}
              >
                {formatPrice(price)}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">
              Price:{' '}
              <Typography color="warning" component="span">
                {formatPrice(displayedPrice)}
              </Typography>
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {cartDiscountPrice || itemDiscountPrice ? (
            <>
              <Typography variant="body1" fontWeight="bold">
                Total Cost:{' '}
                <Typography color="error" component="span" fontWeight="bold">
                  {formatPrice(item.quantity * displayedPrice)}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 1, textDecoration: 'line-through' }}
              >
                {formatPrice(item.quantity * price)}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" fontWeight="bold">
              Total Cost:{' '}
              <Typography color="warning" component="span" fontWeight="bold">
                {formatPrice(item.quantity * displayedPrice)}
              </Typography>
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, width: '100%' }}>
          {item && <CartActionPanel product={transformLineItemToLegoProduct(item)} />}
        </Box>
      </Box>
    </Box>
  );
};
