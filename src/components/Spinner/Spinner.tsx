import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
export const Spinner: React.FC = () => {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <CircularProgress size="3rem" thickness={5} color="warning" />
    </Container>
  );
};
