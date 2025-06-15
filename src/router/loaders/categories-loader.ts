import type { Category } from '@commercetools/platform-sdk';
import { controller } from '@controllers';

export async function categoriesLoader(): Promise<Category[]> {
  return controller.getCategories();
}
