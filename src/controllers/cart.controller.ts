import type { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

import { controller } from './api.controller';

class CartController {
  public async getOrCreateCart(): Promise<Cart> {
    const responseBody = await controller.getCarts();
    const existingCart = responseBody.results[0];

    if (existingCart) {
      return existingCart;
    }

    return await controller.createEmptyCart();
  }

  public async updateCart(
    cartId: string,
    version: number,
    actions: MyCartUpdateAction[]
  ): Promise<Cart> {
    return await controller.updateCart(cartId, version, actions);
  }

  public async addProductToCart(productId: string, currentCart: Cart | null): Promise<Cart> {
    const cart = currentCart ?? (await this.getOrCreateCart());

    return this.updateCart(cart.id, cart.version, [
      {
        action: 'addLineItem',
        productId,
        quantity: 1,
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

const cartController = new CartController();

export { cartController };
