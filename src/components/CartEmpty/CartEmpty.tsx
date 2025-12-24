import cardEmptyImage from '@assets/images/lego-cart-empty.webp';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import { Link } from 'react-router';
import { theme } from 'theme';

export const CartEmpty = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: theme.spacing(8),
      }}
    >
      <img
        className="h-auto w-full max-w-[500px] rounded-4xl"
        src={cardEmptyImage}
        alt="The Cart is Empty"
      />
      <Typography variant="h3" textAlign="center">
        Add the LEGO sets you like to your cart
      </Typography>
      <div className="flex items-center justify-center gap-x-4">
        <Button color="success" variant="contained" component={Link} to={`/${UrlPath.CATALOG}`}>
          Catalog
        </Button>
      </div>
    </Container>
  );
};
