import { useToast } from '@hooks';
import DiscountIcon from '@mui/icons-material/Discount';
import type { SxProps, Theme } from '@mui/material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

interface DiscountButtonProps {
  couponCode: string;
  discountAmount?: string;
  discountName?: string;
  customSX?: SxProps<Theme>;
}

export const DiscountButton: React.FC<DiscountButtonProps> = ({
  couponCode,
  discountAmount,
  discountName,
  customSX,
}) => {
  const { showToast } = useToast();
  const { palette, transitions } = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      showToast(
        <div>
          Coupon{' '}
          <Box
            component="span"
            color={palette.text.secondary}
            fontWeight="700"
          >{`"${couponCode}"`}</Box>{' '}
          copied to clipboard!
        </div>,
        'info'
      );
    } catch {
      showToast(
        'Failed to copy the coupon. Please check your browser settings or try again',
        'warning'
      );
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      title="Copy Coupon"
      aria-label={`Copy coupon code ${couponCode}`}
      onClick={() => void handleCopy()}
      sx={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        rowGap: '2px',
        color: palette.common.white,
        backgroundColor: palette.error.main,
        transition: `background-color ${transitions.duration.complex} ease`,
        '&:hover': {
          backgroundColor: palette.error.light,
          transform: 'translateY(-1px)',
        },
        ...customSX,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 2,
        }}
      >
        <DiscountIcon sx={{ fontSize: 16 }} />
        <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontWeight: 700 }}>
          {couponCode}
        </Typography>
      </Stack>
      {discountAmount && (
        <Typography variant="caption">Get {discountAmount} off on your order</Typography>
      )}
      {discountName && <Typography variant="caption">{discountName}</Typography>}
    </Button>
  );
};
