import Avatar from '@mui/material/Avatar';
import { theme } from 'theme';

const AVATAR_SIZE = 30;

interface ProfileAvatarProps {
  children?: React.ReactNode;
  avatarSize?: number;
  imgSource?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  children,
  avatarSize = AVATAR_SIZE,
  imgSource = '',
}) => {
  return (
    <Avatar
      sx={{ width: avatarSize, height: avatarSize, fontSize: theme.spacing(4) }}
      alt="profile avatar"
      src={imgSource}
    >
      {children}
    </Avatar>
  );
};
