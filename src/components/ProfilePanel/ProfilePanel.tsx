import type { Customer } from '@commercetools/platform-sdk';
import { ProfileButton } from '@components';
import { controller } from '@controllers';
import { useCustomerContext } from '@hooks';
import Button from '@mui/material/Button';

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

  const { setCart } = useCustomerContext();

  const handleLogout = () => {
    if (isOpenBurgerMenu) {
      onBurgerMenuClose?.();
    }

    controller.logoutCustomer();
    setCurrentCustomer(null);
    setCart(null);
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
