export const convertFormDataToString = (value: FormDataEntryValue | null): string => {
  return typeof value === 'string' && value !== null ? value : '';
};
