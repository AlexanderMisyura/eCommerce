import { AboutUsBanner, BreadcrumbsNav } from '@components';
import Container from '@mui/material/Container';
import { theme } from 'theme';

export const AboutUsPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(4),
      }}
    >
      <BreadcrumbsNav />
      <AboutUsBanner />
    </Container>
  );
};
