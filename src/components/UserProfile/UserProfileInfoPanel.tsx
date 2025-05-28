import { useCustomerContext } from '@hooks';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LegoLoader } from 'components/Loaders/LegoLoader';
import { BREADCRUMBS_NAME_MAP } from 'constants/breadcrumbs-name-map';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router';

interface UserProfileInfoPanelProps {
  children: ReactNode;
}

export const UserProfileInfoPanel: React.FC<UserProfileInfoPanelProps> = ({ children }) => {
  const { palette } = useTheme();
  const { loading } = useCustomerContext();
  const location = useLocation();

  // eslint-disable-next-line unicorn/prefer-array-find
  const title = location.pathname.split('/').filter(Boolean).at(-1) ?? '...';

  return (
    <Stack sx={{ flexGrow: 1, minHeight: '500px' }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        {BREADCRUMBS_NAME_MAP[title]}
      </Typography>

      <Stack
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          border: `1px solid ${palette.grey[400]}`,
          padding: 4,
          borderRadius: '10px',
          backgroundColor: palette.common.white,
          position: 'relative',
        }}
      >
        {loading ? <LegoLoader /> : children}
      </Stack>
    </Stack>
  );
};
