import type { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

import { type ApiController, controller } from './api.controller';

class CartController {
  private apiController: ApiController;
  constructor(apiController: ApiController) {
    this.apiController = apiController;
  }

  public async updateCart(cartId: string, version: number, actions: MyCartUpdateAction[]) {
    return await this.apiController.updateCart(cartId, version, actions);
  }

  public async addProductToCart(productId: string, quantity: number, cart: Cart) {
    const response = await this.updateCart(cart.id, cart.version, [
      {
        action: 'addLineItem',
        productId,
        quantity,
      },
    ]);
    return response.body;
  }

  public async changeProductQuantity(
    lineItemId: string,
    quantity: number,
    cart: Cart
  ): Promise<Cart> {
    const response = await this.updateCart(cart.id, cart.version, [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ]);
    return response.body;
  }
}

const cartController = new CartController(controller);

export { cartController };
