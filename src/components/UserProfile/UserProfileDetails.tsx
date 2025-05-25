import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const UserProfileDetails = () => {
  const { palette } = useTheme();
  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        My Details
      </Typography>

      <Stack
        flexGrow={1}
        sx={{ border: `1px solid ${palette.grey[400]}`, padding: 4, borderRadius: '10px' }}
      ></Stack>
    </>
  );
};
