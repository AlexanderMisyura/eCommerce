import noProductsImage from '@assets/images/lego-no-products.webp';
import type { LineItem } from '@commercetools/platform-sdk';
import { controller } from '@controllers';
import { Box, Typography } from '@mui/material';
import { ProductResponseSchema } from '@schemas';
import type { LegoProduct } from '@ts-interfaces';
import { transformToLegoProduct } from '@utils';
import { CartActionPanel } from 'components/CartActionPanel/CartActionPanel';
import { useEffect, useState } from 'react';

export const CartItem = ({ item }: { item: LineItem }) => {
  const [product, setProduct] = useState<LegoProduct | null>(null);
  const slug = item.productSlug?.['en-US'] ?? '';

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
        <Typography variant="body1">
          Price: {(item.quantity * (item.price?.value.centAmount ?? 0)) / 100} $
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {product && <CartActionPanel product={product} />}
        </Box>
      </Box>
    </Box>
  );
};
