import { NumberOfPiecesSchema, RecommendedAgeSchema } from '@schemas';
import type { LegoProduct } from '@ts-interfaces';
import type { LegoProductProjection } from '@ts-types';

export function transformToLegoProduct(projection: LegoProductProjection): LegoProduct {
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
