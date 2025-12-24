import type { LineItem } from '@commercetools/platform-sdk';
import { NumberOfPiecesSchema, RecommendedAgeSchema } from '@schemas';
import type { LegoProduct } from '@ts-interfaces';
import type { LegoProductProjection } from '@ts-types';

export function transformProductProjectionToLegoProduct(
  projection: LegoProductProjection
): LegoProduct {
  return {
    id: projection.id,
    key: projection.key,
    name: projection.name['en-US'],
    slug: projection.slug['en-US'],
    description: projection.description['en-US'],
    numberOfPieces: NumberOfPiecesSchema.parse(projection.masterVariant.attributes[0]).value,
    recommendedAge: RecommendedAgeSchema.parse(projection.masterVariant.attributes[1]).value[
      'en-US'
    ],
    categoryId: projection.categories[0].id,
    price: {
      value: projection.masterVariant.prices[0].value.centAmount,
      withDiscountValue: projection.masterVariant.prices[0].discounted?.value.centAmount,
      currency: projection.masterVariant.prices[0].value.currencyCode,
    },
    images: projection.masterVariant.images?.map((image) => image.url) || [],
    sku: projection.masterVariant.sku,
  };
}

export function transformLineItemToLegoProduct(lineItem: LineItem): LegoProduct {
  return {
    id: lineItem.productId,
    key: lineItem.productKey ?? '',
    name: lineItem.name['en-US'],
    slug: lineItem.productSlug?.['en-US'] ?? '',
    description: '',
    numberOfPieces: NumberOfPiecesSchema.parse(lineItem.variant.attributes?.[0]).value,
    recommendedAge: RecommendedAgeSchema.parse(lineItem.variant.attributes?.[1]).value['en-US'],
    categoryId: '',
    price: {
      value: lineItem.price.value.centAmount,
      withDiscountValue: lineItem.price.discounted?.value.centAmount,
      currency: lineItem.price.value.currencyCode,
    },
    images: lineItem.variant.images?.map((image) => image.url) ?? [],
    sku: lineItem.variant.sku ?? '',
  };
}
