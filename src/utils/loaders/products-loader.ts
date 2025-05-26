import type {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { CARDS_PER_PAGE_LIMIT } from '@constants';
import { ApiController } from '@controllers';
import type { QueryOptions } from '@ts-interfaces';
import type { LoaderFunctionArgs } from 'react-router';

const controller = ApiController.getInstance();

export async function productsLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
  const { categorySlug } = params;
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const queryOptions: QueryOptions = {
    categorySlug: categorySlug ?? 'all',
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
