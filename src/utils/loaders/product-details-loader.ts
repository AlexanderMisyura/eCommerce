import { ApiController } from '@controllers';
import type { LoaderFunctionArgs } from 'react-router';
import { data } from 'react-router';

const controller = ApiController.getInstance();

export async function productDetailsLoader({ params }: LoaderFunctionArgs) {
  const { productSlug } = params;

  if (!productSlug) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data('Product Not Found', 404);
  }

  return controller.getProductBySlug(productSlug);
}
