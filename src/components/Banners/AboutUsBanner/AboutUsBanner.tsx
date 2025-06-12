import bannerImg from '@assets/images/banner_about-us-page.webp';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const AboutUsBanner = () => {
  const { palette } = useTheme();

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: { xs: '150px', md: '250px' },
        backgroundColor: palette.accent.main,
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <Box
        role="presentation"
        aria-hidden="true"
        sx={{
          flexBasis: { xs: '70%', md: '60%' },
          flexGrow: 1,
          alignSelf: 'stretch',
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <Stack
        sx={{
          flexBasis: { xs: '30%', md: '40%' },
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          minWidth: '150px',
          paddingInline: '8px',
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: palette.common.white }}
        >
          About Us
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            fontSize: { xs: '1rem', md: '1.5rem' },
            fontWeight: 700,
            color: palette.backgroundCustom.dark,
          }}
        >
          The Team
        </Typography>
      </Stack>
    </Stack>
  );
};
