import noProductsImage from '@assets/images/lego-no-products.webp';
import type { LineItem } from '@commercetools/platform-sdk';
import { controller } from '@controllers';
import { Box, Typography } from '@mui/material';
import { ProductResponseSchema } from '@schemas';
import type { LegoProduct } from '@ts-interfaces';
import { formatPrice, transformToLegoProduct } from '@utils';
import { CartActionPanel } from 'components/CartActionPanel/CartActionPanel';
import { useEffect, useState } from 'react';

export const CartItem = ({ item }: { item: LineItem }) => {
  const [product, setProduct] = useState<LegoProduct | null>(null);
  const slug = item.productSlug?.['en-US'] ?? '';
  const cartDiscountPrice = item.discountedPricePerQuantity[0]?.discountedPrice.value.centAmount;
  const price = item.price.value.centAmount;
  const itemDiscountPrice = item.price.discounted?.value.centAmount;

  const displayedPrice = cartDiscountPrice ?? itemDiscountPrice ?? price;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await controller.getProductBySlug(slug);
        const parsedResponse = ProductResponseSchema.parse(response);
        const product = parsedResponse.body.results[0];
        const legoProduct: LegoProduct = transformToLegoProduct(product);
        setProduct(legoProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (slug) {
      void fetchProduct();
    }
  }, [slug]);

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
        }}
      >
        <img
          className="rounded-4xl border-2 border-gray-300 object-cover shadow-lg"
          src={product?.images[0] ?? noProductsImage}
          alt={product?.name ?? 'Product image'}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">Model: {product?.name}</Typography>
        <Typography variant="body1">Quantity: {item.quantity}</Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          color={cartDiscountPrice || itemDiscountPrice ? 'error' : 'warning'}
        >
          Price: {formatPrice(item.quantity * displayedPrice)}
        </Typography>
        {(cartDiscountPrice || itemDiscountPrice) && (
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
            sx={{ ml: 1, textDecoration: 'line-through' }}
          >
            {formatPrice(item.quantity * price)}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {product && <CartActionPanel product={product} />}
        </Box>
      </Box>
    </Box>
  );
};
