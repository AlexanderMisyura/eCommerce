import type {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { CARDS_PER_PAGE_LIMIT, CATEGORY, CATEGORY_SLUG_ID_MAP } from '@constants';
import { ApiController } from '@controllers';
import type { QueryOptions } from '@ts-interfaces';
import type { LoaderFunctionArgs } from 'react-router';
import { data } from 'react-router';

const controller = ApiController.getInstance();

export async function productsLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  const { categorySlug } = params;

  const projectSlugs = Object.keys(CATEGORY_SLUG_ID_MAP);

  if (categorySlug && categorySlug !== CATEGORY.ALL && !projectSlugs.includes(categorySlug)) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Category doesn't exist", 404);
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const queryOptions: QueryOptions = {
    categorySlug: categorySlug ?? CATEGORY.ALL,
    filters: {
      age: searchParams.getAll('age'),
      maxPrice: searchParams.get('maxPrice'),
      minPrice: searchParams.get('minPrice'),
      maxPieces: searchParams.get('maxPieces'),
      minPieces: searchParams.get('minPieces'),
    },
    searchQuery: searchParams.get('q'),
    sort: searchParams.get('sort'),
    page: Number(searchParams.get('page')) || 1,
    limit: CARDS_PER_PAGE_LIMIT,
  };

  return controller.getProducts(queryOptions);
}
