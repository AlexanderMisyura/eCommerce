import noProductsImage from '@assets/images/lego-no-products.webp';
import { Pagination, Sorting } from '@components';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ProductResponseSchema } from '@schemas';
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
            <Grid container spacing={2} marginBottom={4}>
              {resolvedProducts.map((product) => {
                const name = product.name['en-US'];
                const description = product.description['en-US'];
                const price = product.masterVariant.prices?.[0]?.value.centAmount;
                const discount = product.masterVariant.prices?.[0]?.discounted?.value.centAmount;
                const image = product.masterVariant.images?.[0]?.url;

                return (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={product.id}>
                    <Card
                      style={{ border: '1px solid #ccc' /* padding: '1rem', */, aspectRatio: '1' }}
                    >
                      <CardActionArea
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          '&[data-active]': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                              backgroundColor: 'action.selectedHover',
                            },
                          },
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <img
                            src={image}
                            alt={name}
                            style={{ width: '100%', height: '150px', objectFit: 'contain' }}
                          />
                        </Box>
                        <Box padding={'1rem'}>
                          <Typography variant="h6">{name}</Typography>
                          <Typography fontSize={'0.8rem'}>Description: {description}</Typography>
                          <Typography className={discount ? 'line-through' : ''}>
                            ${price / 100}
                          </Typography>
                          {discount && (
                            <Typography color="warning">
                              With discount: ${discount / 100}
                            </Typography>
                          )}
                        </Box>
                        {/* <CardContent>
                        </CardContent> */}
                      </CardActionArea>
                    </Card>
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
