import { BreadcrumbsNav, ProductFilter, Spinner } from '@components';
import { CATEGORY, CATEGORY_SLUG_PRETTY_NAME_MAP } from '@constants';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { UrlPath } from '@ts-enums';
import { Outlet, useNavigation } from 'react-router';
import { theme } from 'theme';

export const CatalogPage: React.FC = () => {
  const navigation = useNavigation();
  const isUpdateLoading =
    navigation.state === 'loading' && navigation.location.pathname.includes(UrlPath.CATALOG);

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
        <Box sx={{ flexGrow: 1 }}>{isUpdateLoading ? <Spinner /> : <Outlet />}</Box>
      </Box>
    </Container>
  );
};
