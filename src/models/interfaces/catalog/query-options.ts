import type { Filters } from './filters';

export interface QueryOptions {
  page: number;
  limit: number;
  categorySlug?: string;
  filters?: Filters;
  searchQuery?: string | null;
  sort?: string | null;
}
