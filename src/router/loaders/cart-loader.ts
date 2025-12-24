import { controller } from '@controllers';

export function cartLoader() {
  return controller.getCardWithDiscount();
}
