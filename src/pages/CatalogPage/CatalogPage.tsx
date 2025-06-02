import { BreadcrumbsNav, ProductFilter } from '@components';
import { CATEGORY, CATEGORY_SLUG_PRETTY_NAME_MAP } from '@constants';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
      <BreadcrumbsNav
        nameMap={CATEGORY_SLUG_PRETTY_NAME_MAP}
        filterPredicate={(pathname) => pathname !== CATEGORY.ALL}
      />
      <Box display="flex" gap={{ xs: 8, sm: 3, lg: 8 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <ProductFilter />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};
