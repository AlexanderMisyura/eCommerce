import { Skeleton, Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LegoLoader } from 'components/Loaders/LegoLoader';

export const UserProfileSkeleton = () => {
  const { palette, spacing } = useTheme();

  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: spacing(4) }}>
        <Skeleton variant="text" animation="wave" sx={{ maxWidth: spacing(60) }} />
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
        }}
      >
        <LegoLoader />
      </Stack>
    </>
  );
};
