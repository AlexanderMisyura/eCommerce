import { CATEGORY_SLUG_ID_MAP, LOCALIZED_TEXT_STRING, SORT_MAP } from '@constants';
import type { ProductQuery, QueryOptions } from '@ts-interfaces';
import { PAGE_OFFSET } from 'constants/implementation-specific';

export function createProductQuery(options: QueryOptions): ProductQuery {
  const { page, limit, categorySlug, filters, searchQuery, sort } = options;

  const query: ProductQuery = {
    limit,
    offset: (page - PAGE_OFFSET) * limit,
    filter: [],
  };

  if (filters) {
    const { minPrice, maxPrice, minPieces, maxPieces, age } = filters;
    if (age?.length) {
      const ages = age.map((value) => `"${value}"`).join(',');
      query.filter.push(`variants.attributes.recommendedAge.en-US:${ages}`);
    }

    if (minPrice && maxPrice) {
      query.filter.push(
        `variants.price.centAmount:range (${Number(minPrice) * 100} to ${Number(maxPrice) * 100})`
      );
    }

    if (minPieces && maxPieces) {
      query.filter.push(`variants.attributes.numberOfPieces:range (${minPieces} to ${maxPieces})`);
    }
  }

  if (categorySlug) {
    if (categorySlug === 'all') {
      const allCategories = Object.values(CATEGORY_SLUG_ID_MAP)
        .map((id) => `"${id}"`)
        .join(',');
      query.filter.push(`categories.id:${allCategories}`);
    } else if (CATEGORY_SLUG_ID_MAP[categorySlug]) {
      query.filter.push(`categories.id:"${CATEGORY_SLUG_ID_MAP[categorySlug]}"`);
    }
  }

  if (searchQuery) {
    query.fuzzy = true;
    query[LOCALIZED_TEXT_STRING] = searchQuery;
  }

  if (sort && SORT_MAP[sort]) {
    query.sort = SORT_MAP[sort];
  }

  return query;
}
