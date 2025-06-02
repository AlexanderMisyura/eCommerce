import type { Customer } from '@commercetools/platform-sdk';
import { ProfileButton } from '@components';
import { ApiController } from '@controllers';
import Button from '@mui/material/Button';

const controller = ApiController.getInstance();

interface ProfilePanelProps {
  currentCustomer: Customer;
  setCurrentCustomer: (value: Customer | null) => void;
  onBurgerMenuClose?: () => void;
  isOpenBurgerMenu?: boolean;
  className?: string;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = (props) => {
  const {
    className,
    currentCustomer,
    isOpenBurgerMenu = false,
    setCurrentCustomer,
    onBurgerMenuClose,
  } = props;

  const handleLogout = () => {
    if (isOpenBurgerMenu) {
      onBurgerMenuClose?.();
    }

    controller.logoutCustomer();
    setCurrentCustomer(null);
  };

  return (
    <div className={className}>
      <ProfileButton customer={currentCustomer} onClick={() => onBurgerMenuClose?.()} />
      <Button
        variant="outlined"
        size="small"
        onClick={handleLogout}
        aria-label="Log out"
        title="Log out"
      >
        Log out
      </Button>
    </div>
  );
};
