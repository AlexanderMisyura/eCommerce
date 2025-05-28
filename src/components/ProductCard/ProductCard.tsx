import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { LegoProduct } from '@ts-interfaces';

interface ProductCardProps {
  product: LegoProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { images, name, price, description } = product;
  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        transition: 'transform 0.15s',
        '&:hover': {
          transform: 'scale(1.01) translateY(-4px)',
          boxShadow: '0px 3px 10px 1px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {price.withDiscountValue && (
        <Chip
          size="small"
          color="warning"
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
          label={`${Math.round(((price.value - price.withDiscountValue) / price.value) * 100)}% OFF`}
        />
      )}
      {/* TODO: Add link to product */}
      <CardActionArea sx={{ flexGrow: 1 }} onClick={() => 'go to /products:`${productSlug}`'}>
        <CardMedia
          component="img"
          image={images[0]}
          alt={name}
          sx={{ objectFit: 'contain', height: '250px' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {name}
          </Typography>
          <Typography overflow="hidden" maxHeight={21} variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box display="flex" alignItems="center">
            {price.withDiscountValue ? (
              <>
                <Typography variant="h6" color="warning" fontWeight="bold">
                  ${price.withDiscountValue / 100}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1, textDecoration: 'line-through' }}
                >
                  ${price.value / 100}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="warning" fontWeight="bold">
                ${price.value / 100}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="success">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
