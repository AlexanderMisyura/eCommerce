import { controller } from '@controllers';

export async function customerFullDataLoader() {
  return await controller.getFullCustomerData();
}
