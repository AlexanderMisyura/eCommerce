import { CartAction } from '@ts-enums';
import { z } from 'zod';

/* 'addDiscountCode' */
const AddDiscountCodeActionSchema = z.object({
  action: z.literal(CartAction.ADD_DISCOUNT_CODE),
  code: z.string().min(1, 'Discount code cannot be empty'),
});

/* 'removeDiscountCode' */
const RemoveDiscountCodeActionSchema = z.object({
  action: z.literal(CartAction.REMOVE_DISCOUNT_CODE),
  discountCode: z.object({
    typeId: z.literal('discount-code'),
    id: z.string(),
  }),
});

/* 'changeLineItemQuantity' */
const ChangeLineItemQuantityActionSchema = z.object({
  action: z.literal(CartAction.CHANGE_LINE_ITEM_QUANTITY),
  lineItemId: z.string(),
  quantity: z.number().min(0),
});

export const CartActionSchema = z.discriminatedUnion('action', [
  AddDiscountCodeActionSchema,
  RemoveDiscountCodeActionSchema,
  ChangeLineItemQuantityActionSchema,
]);

export const CartUpdateSchema = z.object({
  ID: z.string(),
  version: z.number(),
  action: CartActionSchema,
});
