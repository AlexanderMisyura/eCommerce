import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { UrlPath } from '@ts-enums';
import { Link } from 'react-router';

export const Footer = () => {
  const { palette, spacing } = useTheme();
  return (
    <Box
      component="footer"
      sx={{ bgcolor: palette.backgroundCustom.main, color: palette.common.white }}
    >
      <Container sx={{ paddingBlock: spacing(2) }}>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Stack sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="caption">
              Made with ❤️ by{' '}
              <Link to={UrlPath.ABOUT} style={{ fontWeight: 700, color: palette.common.white }}>
                The Team
              </Link>
            </Typography>
            <Typography variant="caption">© 2025 All Rights Reserved</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
