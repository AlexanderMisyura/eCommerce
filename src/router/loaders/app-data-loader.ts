import { controller } from '@controllers';

export async function appDataLoader() {
  return await controller.getAppData();
}
