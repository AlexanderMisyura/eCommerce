import { convertFormDataToString } from '@utils';

describe('convertFormDataToString', () => {
  it('should return empty string when value is null', () => {
    expect(convertFormDataToString(null)).toBe('');
  });

  it('should return empty string when value is undefined', () => {
    expect(convertFormDataToString(undefined as unknown as FormDataEntryValue)).toBe('');
  });

  it('should return empty string when value is not a string', () => {
    expect(convertFormDataToString(123 as unknown as FormDataEntryValue)).toBe('');
  });

  it('should return value when value is a string', () => {
    expect(convertFormDataToString('some value')).toBe('some value');
  });
});
