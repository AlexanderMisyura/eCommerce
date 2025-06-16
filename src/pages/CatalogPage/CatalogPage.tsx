import { BreadcrumbsNav, ProductFilter, Spinner } from '@components';
import { CATEGORY, CATEGORY_SLUG_PRETTY_NAME_MAP } from '@constants';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { UrlPath } from '@ts-enums';
import { Outlet, useNavigation } from 'react-router';

export const CatalogPage: React.FC = () => {
  const navigation = useNavigation();
  const isUpdateLoading =
    navigation.state === 'loading' && navigation.location.pathname.includes(UrlPath.CATALOG);

  return (
    <Container
      sx={{
        flexGrow: 1,
      }}
    >
      <BreadcrumbsNav
        nameMap={CATEGORY_SLUG_PRETTY_NAME_MAP}
        filterPredicate={(pathname) => pathname !== CATEGORY.ALL}
        sx={{ mb: 4 }}
      />
      <Stack sx={{ rowGap: 8, mb: 4 }}>
        <Box
          display="flex"
          gap={{ xs: 8, sm: 3, lg: 8 }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <ProductFilter />
          <Box sx={{ flexGrow: 1 }}>{isUpdateLoading ? <Spinner /> : <Outlet />}</Box>
        </Box>
      </Stack>
    </Container>
  );
};
