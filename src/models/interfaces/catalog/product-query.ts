import type { QueryParam } from '@commercetools/platform-sdk';
import type { LOCALIZED_TEXT_STRING } from '@constants';

interface QueryArguments {
  [key: string]: QueryParam;
  markMatchingVariants?: boolean;
  fuzzy?: boolean;
  fuzzyLevel?: number;
  'filter.query'?: string | string[];
  filter?: string | string[];
  facet?: string | string[];
  'filter.facets'?: string | string[];
  expand?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceCustomerGroupAssignments?: string | string[];
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
}

export interface ProductQuery extends QueryArguments {
  limit: number;
  offset: number;
  filter: string[];
  [LOCALIZED_TEXT_STRING]?: string;
  sort?: string | string[];
  fuzzy?: boolean;
}
