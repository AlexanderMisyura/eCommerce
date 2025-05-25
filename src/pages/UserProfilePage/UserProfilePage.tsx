import { BreadcrumbsNav, UserProfileNav } from '@components';
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
          <Stack sx={{ flexGrow: 1, minHeight: '500px' }}>
            <Outlet />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
