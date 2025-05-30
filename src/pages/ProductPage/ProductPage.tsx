import { ProductImage } from '@components';
import { Box, Button, Chip, Grid, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ProductResponseSchema } from '@schemas';
import { transformToLegoProduct } from '@utils';
import { useLoaderData } from 'react-router';

export const ProductPage = () => {
  const response = ProductResponseSchema.parse(useLoaderData());
  const product = transformToLegoProduct(response.body.results[0]);

  const { images, name, description, price, recommendedAge } = product;

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <ProductImage images={images} name={name} className="h-[300px]" />
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {`Recommended age: ${recommendedAge}`}
            </Typography>

            <Box display="flex" alignItems="center" my={2}>
              {price.withDiscountValue ? (
                <>
                  <Chip
                    size="small"
                    color="warning"
                    sx={{ mr: 2 }}
                    label={`${Math.round(
                      ((price.value - price.withDiscountValue) / price.value) * 100
                    )}% OFF`}
                  />
                  <Typography variant="h4" color="error" fontWeight="bold">
                    ${price.withDiscountValue / 100}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ ml: 1, textDecoration: 'line-through' }}
                  >
                    ${price.value / 100}
                  </Typography>
                </>
              ) : (
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ${price.value / 100}
                </Typography>
              )}
            </Box>

            <Button variant="contained" color="success" size="large" sx={{ mt: 2 }}>
              Add to cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
