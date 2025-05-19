import { PagePlaceholder } from '@components';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { theme } from 'theme';

export const UserProfilePage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(8),
      }}
    >
      <Typography variant="h2">User Profile Page</Typography>
      <PagePlaceholder /> {/* TODO: Remove */}
    </Container>
  );
};
