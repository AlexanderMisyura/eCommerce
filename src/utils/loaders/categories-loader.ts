import type { Category } from '@commercetools/platform-sdk';
import { ApiController } from '@controllers';

const controller = ApiController.getInstance();

export async function categoriesLoader(): Promise<Category[]> {
  return controller.getCategories();
}
