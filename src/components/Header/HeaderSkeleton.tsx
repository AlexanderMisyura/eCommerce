import { Skeleton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { theme } from 'theme';

export const HeaderSkeleton = () => {
  return (
    <AppBar color="inherit" position="sticky">
      <Container>
        <Toolbar disableGutters sx={{ columnGap: theme.spacing(4) }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={100}
            sx={{
              marginRight: { xs: 'auto', md: 0 },
            }}
          />
          <Skeleton
            variant="rounded"
            width={400}
            animation="wave"
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
              marginRight: 'auto',
            }}
          />
          <Skeleton variant="rounded" width={100} animation="wave" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
