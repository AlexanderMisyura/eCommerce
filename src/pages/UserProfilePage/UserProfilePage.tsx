import { BreadcrumbsNav, UserProfileInfoPanel, UserProfileNav } from '@components';
import { useCustomerContext } from '@hooks';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { UrlPath } from '@ts-enums';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export const UserProfilePage = () => {
  const { currentCustomer, loading } = useCustomerContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentCustomer) void navigate(UrlPath.SIGN_IN);
  }, [currentCustomer, loading, navigate]);

  return (
    <Container>
      <Stack sx={{ flexDirection: 'column' }}>
        <BreadcrumbsNav sx={{ marginBottom: 4 }} />
        <Stack
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            flexGrow: 1,
            gap: 4,
          }}
        >
          <UserProfileNav />
          <UserProfileInfoPanel>
            <Outlet />
          </UserProfileInfoPanel>
        </Stack>
      </Stack>
    </Container>
  );
};
