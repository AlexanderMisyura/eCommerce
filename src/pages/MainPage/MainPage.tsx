import { DiscountBanners } from '@components';
import Container from '@mui/material/Container';
import { theme } from 'theme';

export const MainPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(4),
      }}
    >
      <DiscountBanners />
    </Container>
  );
};
