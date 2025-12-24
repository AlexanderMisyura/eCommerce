interface DiscountData {
  discountName: string;
  discountAmount: string;
  couponCode: string;
}

type DiscountKeys = 'student' | 'general';

export const DISCOUNTS: Record<DiscountKeys, DiscountData> = {
  student: {
    discountName: 'RS-School',
    discountAmount: '50%',
    couponCode: 'REVIEWER1-50',
  },
  general: {
    discountName: 'Summer Season',
    discountAmount: '25%',
    couponCode: 'HOTDEAL-25',
  },
} as const;
