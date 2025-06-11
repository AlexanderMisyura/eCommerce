import discountBackground from '@assets/images/banner_compressed.webp';
import { DiscountButton } from '@components';
import { DISCOUNTS } from '@constants';
import { Box, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';

export const DiscountBanner = () => {
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
          minHeight: { xs: 400, md: 500 },
          padding: { xs: '16px 8px', md: '16px' },
          marginInline: 'auto',
          backgroundImage: `url(${discountBackground})`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '10px',
          boxShadow: `inset 0 0 50px ${palette.backgroundCustom.dark}`,
        }}
      >
        <DiscountButton
          discountAmount={DISCOUNTS.student.discountAmount}
          couponCode={DISCOUNTS.student.couponCode}
        />
        <DiscountButton
          discountAmount={DISCOUNTS.general.discountAmount}
          couponCode={DISCOUNTS.general.couponCode}
        />
      </Stack>
    </Box>
  );
};
