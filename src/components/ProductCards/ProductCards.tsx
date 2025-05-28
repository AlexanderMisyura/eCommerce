import noProductsImage from '@assets/images/lego-no-products.webp';
import { Pagination, ProductCard, Sorting } from '@components';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ProductResponseSchema } from '@schemas';
import type { LegoProduct } from '@ts-interfaces';
import { transformToLegoProduct } from '@utils';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

export const ProductCards: React.FC = () => {
  const response = ProductResponseSchema.parse(useLoaderData());
  const { results: products, total } = response.body;

  if (!products || products.length === 0 || !total) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          className="h-auto w-full max-w-[500px] rounded-4xl"
          src={noProductsImage}
          alt="page not found 404"
        />
      </Container>
    );
  }

  return (
    <Suspense>
      <Await
        resolve={products}
        errorElement={<Typography>Error</Typography>}
        children={(resolvedProducts) => (
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography lineHeight="inherit" variant="h3">
                Products ({total})
              </Typography>
              <Sorting />
            </Box>
            <Grid container spacing={3} marginBottom={4}>
              {resolvedProducts.map((product) => {
                const legoProduct: LegoProduct = transformToLegoProduct(product);

                return (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={legoProduct.id}>
                    <ProductCard key={legoProduct.id} product={legoProduct} />
                  </Grid>
                );
              })}
            </Grid>

            <Pagination productsTotal={total} />
          </Box>
        )}
      ></Await>
    </Suspense>
  );
};
