import { Button } from '@mui/material';
import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';
import { Link } from 'react-router';

interface AuthPanelProps {
  className?: string;
  isOpenBurgerMenu?: boolean;
  onBurgerMenuClose?: () => void;
}

export const AuthPanel: React.FC<AuthPanelProps> = (props) => {
  const { className, isOpenBurgerMenu = false, onBurgerMenuClose } = props;

  const handleClick = () => {
    if (isOpenBurgerMenu) {
      onBurgerMenuClose?.();
    }
  };

  return (
    <div className={clsx('flex items-center justify-center gap-x-3 p-4', className)}>
      <Button
        variant="outlined"
        size="small"
        component={Link}
        to={UrlPath.SIGN_IN}
        title="Sign In"
        onClick={handleClick}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        size="small"
        component={Link}
        to={UrlPath.REGISTRATION}
        title="Registration"
        onClick={handleClick}
      >
        Registration
      </Button>
    </div>
  );
};
