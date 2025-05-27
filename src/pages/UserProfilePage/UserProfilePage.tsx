import { BreadcrumbsNav, UserProfileInfoPanel, UserProfileNav } from '@components';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';

export const UserProfilePage = () => {
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
