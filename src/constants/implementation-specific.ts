export const COUNTRY = {
  BELARUS: 'BY',
} as const;

export const CARDS_PER_PAGE_LIMIT = 12;
export const PAGE_OFFSET = 1;

export const CATEGORY = {
  ALL: 'all',
  STAR_WARS: 'Lego Star Wars',
  LOTR: 'Lego LotR',
  TECHNIC: 'Lego Technic',
  BATMAN: 'Lego Batman',
} as const;

export const CATEGORY_SLUG_PRETTY_NAME_MAP: Record<string, string> = {
  lotr: 'Lord of the Rings',
  'star-wars': 'Star Wars',
  technic: 'Technic',
  batman: 'Batman',
};

export const PRICE = {
  MIN: 0,
  MAX: 800,
  STEP: 10,
} as const;

export const PIECES = {
  MIN: 50,
  MAX: 8000,
  STEP: 50,
} as const;

export const RECOMMENDED_AGE = [
  '4+',
  '6+',
  '7+',
  '8+',
  '9+',
  '10+',
  '11+',
  '12+',
  '14+',
  '16+',
  '18+',
] as const;

export const SORT_OPTIONS = {
  DEFAULT: 'default',
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  NAME_ASC: 'NAME_ASC',
  NAME_DESC: 'NAME_DESC',
} as const;

export const SORT_MAP: Record<string, string> = {
  PRICE_ASC: 'price asc',
  PRICE_DESC: 'price desc',
  NAME_ASC: 'name.en-US asc',
  NAME_DESC: 'name.en-US desc',
};

export const LOCALIZED_TEXT_STRING = 'text.en-US';
