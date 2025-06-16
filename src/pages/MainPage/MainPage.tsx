import BatmanLego from '@assets/images/LEGO_batman_compress.png';
import StarWarsLego from '@assets/images/lego_star-wars_compress.png';
import TechnicsLego from '@assets/images/lego_technik_compress.png';
import { DiscountBanners } from '@components';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import { UrlPath } from '@ts-enums';
import { Link } from 'react-router';

export const MainPage = () => {
  const { spacing, palette } = useTheme();
  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: spacing(8),
        mb: 4,
      }}
    >
      <Box component={'section'}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Epic Deals Await{' '}
        </Typography>
        <DiscountBanners />
      </Box>

      <Box component={'section'}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Build Your Universe
        </Typography>
        <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {[
            {
              img: BatmanLego,
              url: `${UrlPath.CATALOG}/batman`,
              subtitle: 'The Dark Brick Rises!',
              discount: '',
            },
            {
              img: StarWarsLego,
              url: `${UrlPath.CATALOG}/star-wars/spaceships`,
              subtitle: 'The Force is in Your Hands!',
              discount: '5% Off Spaceships Only!',
            },
            {
              img: TechnicsLego,
              url: `${UrlPath.CATALOG}/technic`,
              subtitle: 'Speed. Power. Bricks!',
              discount: '',
            },
          ].map(({ img, url, subtitle, discount }) => (
            <Box
              component={Link}
              key={url}
              to={url}
              sx={{
                width: { xs: '85%', lg: '32%' },
                maxWidth: '300px',
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src={img}
                alt={`Lego category ${subtitle} `}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  mb: 4,
                }}
              />
              <Stack sx={{ alignItems: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{ textAlign: 'center', color: palette.text.secondary }}
                >
                  {subtitle}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: palette.error.main, fontWeight: 700 }}>
                  {discount}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};
