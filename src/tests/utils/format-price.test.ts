import { formatPrice } from '@utils';

describe('formatPrice', () => {
  it('should return a string representing a price with a dollar sign and two decimal places', () => {
    expect(formatPrice(1234)).toBe('$12.34');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
