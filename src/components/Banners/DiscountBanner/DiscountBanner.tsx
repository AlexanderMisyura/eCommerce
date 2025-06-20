import discountBackground from '@assets/images/banner_compressed.webp';
import { DiscountButton } from '@components';
import { useAppDataContext } from '@hooks';
import { Box, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
export const DiscountBanner = () => {
  const { discountCodes } = useAppDataContext();
  const { palette } = useTheme();

  return (
    <Box sx={{ backgroundColor: palette.backgroundCustom.dark, borderRadius: '10px' }}>
      <Stack
        sx={{
          alignSelf: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'flex-end', sm: 'center' },
          alignItems: { xs: 'center', sm: 'flex-end' },
          gap: { xs: '8px', sm: '16px' },
          maxWidth: '900px',
          width: '100%',
          minHeight: { xs: 400, sm: 500 },
          padding: { xs: '16px 8px', sm: '16px' },
          marginInline: 'auto',
          backgroundImage: `url(${discountBackground})`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          boxShadow: `inset 0 0 50px ${palette.backgroundCustom.dark}`,
        }}
      >
        <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 4 } }}>
          {discountCodes.map((code) => (
            <DiscountButton
              key={code.id}
              couponCode={code.code}
              discountName={code.description?.['en-US']}
              customSX={{ flex: '1 1 0', maxWidth: '240px' }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
