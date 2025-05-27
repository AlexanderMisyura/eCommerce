import { ProductFilter } from '@components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router';
import { theme } from 'theme';

export const CatalogPage: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: theme.spacing(8),
      }}
    >
      <Typography variant="h2">Catalog</Typography>
      <Box display="flex" gap={{ xs: 8, sm: 3, lg: 8 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <ProductFilter />
        <Outlet />
      </Box>
    </Container>
  );
};
