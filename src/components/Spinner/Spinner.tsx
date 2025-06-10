import LegoSpinner from '@assets/icons/lego-spinner.svg';
import Container from '@mui/material/Container';

export const Spinner: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <LegoSpinner width={150} height={150} />
    </Container>
  );
};
