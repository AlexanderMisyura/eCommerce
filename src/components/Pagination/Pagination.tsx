import { CARDS_PER_PAGE_LIMIT } from '@constants';
import { Box, Pagination as MuiPagination, PaginationItem } from '@mui/material';
import { Link, useLocation, useNavigation, useSearchParams } from 'react-router';

interface PaginationProps {
  productsTotal: number;
}

export const Pagination: React.FC<PaginationProps> = ({ productsTotal }) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const totalPages = Math.ceil(productsTotal / CARDS_PER_PAGE_LIMIT);

  if (totalPages < 2) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center">
      <MuiPagination
        size="large"
        color="primary"
        count={totalPages}
        page={Number(searchParams.get('page')) || 1}
        renderItem={(item) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set('page', String(item.page));
          return (
            <PaginationItem
              component={Link}
              to={`${location.pathname}?${newSearchParams.toString()}`}
              {...item}
            />
          );
        }}
        disabled={isLoading}
      />
    </Box>
  );
};
