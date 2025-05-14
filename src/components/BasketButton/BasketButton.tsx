import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UrlPath } from '@ts-enums';
import { Link } from 'react-router';

export const BasketButton = () => {
  return (
    <Link to={UrlPath.BASKET}>
      <ShoppingCartIcon className="text-blue-400" />
    </Link>
  );
};
