import avatarImg from '@assets/images/user-avatar_compress.png';
import type { Customer } from '@commercetools/platform-sdk';
import { useTheme } from '@mui/material';
import { UrlPath } from '@ts-enums';
import { NavLink } from 'react-router';

import { ProfileAvatar } from './ProfileAvatar';

interface ProfileButtonProps {
  customer: Customer;
  onClick: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  const { customer, onClick } = props;
  const { palette } = useTheme();

  const first = customer.firstName?.at(0) ?? 'U';
  const last = customer.lastName?.at(0) ?? 'P';
  const avatarLetters = `${first}${last}`.toUpperCase();

  return (
    <NavLink
      to={UrlPath.USER_PROFILE}
      title="User Profile"
      onClick={onClick}
      style={({ isActive }) => ({
        padding: '2px',
        border: '2px solid transparent',
        borderRadius: '50%',
        borderColor: isActive ? palette.primary.main : palette.text.disabled,
      })}
    >
      <ProfileAvatar avatarSize={24} imgSource={avatarImg}>
        {avatarLetters}
      </ProfileAvatar>
    </NavLink>
  );
};
