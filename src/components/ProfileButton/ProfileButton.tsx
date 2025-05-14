import type { Customer } from '@commercetools/platform-sdk';
import Avatar from '@mui/material/Avatar';
import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';
import { NavLink } from 'react-router';

export interface ProfileButtonProps {
  customer: Customer;
}

const AVATAR_SIZE = 30;

export const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  const { customer } = props;
  const first = customer.firstName?.at(0) ?? 'A';
  const last = customer.lastName?.at(0) ?? 'A';
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
      title="User profile"
    >
      <Avatar
        sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, fontSize: '16px' }}
        alt="profile avatar"
      >
        {avatarLetters}
      </Avatar>
    </NavLink>
  );
};
