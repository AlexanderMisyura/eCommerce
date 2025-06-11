import type { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

import { type ApiController, controller } from './api.controller';

class CartController {
  private apiController: ApiController;
  constructor(apiController: ApiController) {
    this.apiController = apiController;
  }

  public async updateCart(
    cartId: string,
    version: number,
    actions: MyCartUpdateAction[]
  ): Promise<Cart> {
    const response = await this.apiController.updateCart(cartId, version, actions);
    return response;
  }

  public async addProductToCart(productId: string, quantity: number, cart: Cart) {
    return await this.updateCart(cart.id, cart.version, [
      {
        action: 'addLineItem',
        productId,
        quantity,
      },
    ]);
  }

  public async changeProductQuantity(
    lineItemId: string,
    quantity: number,
    cart: Cart
  ): Promise<Cart> {
    return await this.updateCart(cart.id, cart.version, [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ]);
  }
}

const cartController = new CartController(controller);

export { cartController };
