import BackgroundImg404 from '@assets/images/background-404.webp';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import { Link, useNavigate } from 'react-router';
import { theme } from 'theme';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: theme.spacing(8),
      }}
    >
      <img
        className="h-auto w-full max-w-[500px] rounded-4xl"
        src={BackgroundImg404}
        alt="page not found 404"
      />
      <Typography variant="h3" textAlign="center">
        Oops! Something went wrong...
      </Typography>
      <div className="flex items-center justify-center gap-x-4">
        <Button variant="outlined" onClick={() => void navigate(-1)}>
          Go Back
        </Button>
        <Button variant="contained" component={Link} to={UrlPath.HOME}>
          Take Me Home
        </Button>
      </div>
    </Container>
  );
};
