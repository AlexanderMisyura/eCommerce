import type { Customer } from '@commercetools/platform-sdk';
import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';
import { NavLink } from 'react-router';

import { ProfileAvatar } from './ProfileAvatar';

interface ProfileButtonProps {
  customer: Customer;
  onClick: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  const { customer, onClick } = props;

  const first = customer.firstName?.at(0) ?? 'U';
  const last = customer.lastName?.at(0) ?? 'P';
  const avatarLetters = `${first}${last}`.toUpperCase();

  return (
    <NavLink
      to={UrlPath.USER_PROFILE}
      className={({ isActive }) =>
        clsx(
          'rounded-full border-1 p-1',
          isActive ? 'border-blue-400 ring ring-blue-300' : 'border-transparent'
        )
      }
      title="User Profile"
      onClick={onClick}
    >
      <ProfileAvatar>{avatarLetters}</ProfileAvatar>
    </NavLink>
  );
};
