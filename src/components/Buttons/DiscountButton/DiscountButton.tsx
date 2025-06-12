import { useToast } from '@hooks';
import DiscountIcon from '@mui/icons-material/Discount';
import type { SxProps, Theme } from '@mui/material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

interface DiscountButtonProps {
  couponCode: string;
  discountAmount: string;
  discountName?: string;
  customSX?: SxProps<Theme>;
}

export const DiscountButton: React.FC<DiscountButtonProps> = ({
  couponCode,
  discountAmount,
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
      startIcon={<DiscountIcon />}
      title="Copy Coupon"
      aria-label={`Copy coupon code ${couponCode}`}
      onClick={() => void handleCopy()}
      sx={{
        color: palette.common.white,
        backgroundColor: palette.error.main,
        transition: `background-color ${transitions.duration.complex} ease`,
        '&:hover': {
          backgroundColor: palette.error.light,
          transform: 'scale(1.01)',
        },
        ...customSX,
      }}
    >
      <Stack>
        <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, fontWeight: 700 }}>
          {couponCode}
        </Typography>
        <Typography variant="caption">Get {discountAmount} off on your order</Typography>
      </Stack>
    </Button>
  );
};
