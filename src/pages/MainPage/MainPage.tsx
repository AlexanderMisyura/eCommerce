import { useAppDataContext } from '@hooks';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { theme } from 'theme';

export const MainPage = () => {
  const { currentCustomer, loading } = useAppDataContext();
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(4),
      }}
    >
      <Typography variant="h2">Main Page</Typography>
      {loading ? (
        <Skeleton sx={{ width: 200 }}></Skeleton>
      ) : (
        <Typography>
          Hello{' '}
          <span style={{ color: theme.palette.primary.main }}>
            {currentCustomer?.firstName ?? 'Guest'}
          </span>
        </Typography>
      )}
    </Container>
  );
};
