import type { Customer } from '@commercetools/platform-sdk';
import { ProfileButton } from '@components';

interface ProfilePanelProps {
  currentCustomer: Customer;
  onBurgerMenuClose?: () => void;
  className?: string;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = (props) => {
  const { className, currentCustomer, onBurgerMenuClose } = props;

  return (
    <div className={className}>
      <ProfileButton customer={currentCustomer} onClick={() => onBurgerMenuClose?.()} />
    </div>
  );
};
