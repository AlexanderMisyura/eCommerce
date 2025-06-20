import { controller } from '@controllers';
import { CartUpdateSchema } from '@schemas';
import { type ActionFunctionArgs } from 'react-router';

export const cartAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const updateData = CartUpdateSchema.parse(await request.json());
    const { ID, version, action } = updateData;

    const updatedCart = await controller.updateCart(ID, version, [action]);

    return updatedCart;
  } catch (error) {
    return error;
  }
};
