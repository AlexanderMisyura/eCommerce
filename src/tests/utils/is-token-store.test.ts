import { isTokenStore } from '@utils';

describe('isTokenStore function', () => {
  it('returns true for valid TokenStore values', () => {
    expect(
      isTokenStore({ expirationTime: 11_111, refreshToken: 'refreshToken', token: 'token' })
    ).toBe(true);
  });

  it('returns false for invalid TokenStore values', () => {
    expect(isTokenStore('string')).toBe(false);
    expect(isTokenStore(123)).toBe(false);
    expect(isTokenStore(true)).toBe(false);
    expect(isTokenStore({})).toBe(false);
    expect(isTokenStore([])).toBe(false);
    expect(isTokenStore(null)).toBe(false);
  });
});
