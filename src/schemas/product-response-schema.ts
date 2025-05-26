import { z } from 'zod';

const Category = z.object({
  id: z.string(),
});

const Attribute = z.object({
  name: z.string(),
  value: z.union([z.object({ 'en-US': z.string() }), z.number()]),
});

const PriceValue = z.object({
  centAmount: z.number(),
  currencyCode: z.string(),
  fractionDigits: z.number(),
});

const PriceDiscounted = z.object({
  discount: z.object({
    id: z.string(),
    typeId: z.string(),
  }),
  value: PriceValue,
});

const Price = z.object({
  discounted: PriceDiscounted.optional(),
  id: z.string(),
  key: z.string(),
  value: PriceValue,
});

const ProductProjectionSchema = z.object({
  categories: z.array(Category),
  description: z.object({
    'en-US': z.string(),
  }),
  id: z.string(),
  key: z.string(),
  masterVariant: z.object({
    attributes: z.array(Attribute),
    images: z.array(
      z.object({
        url: z.string(),
      })
    ),
    key: z.string(),
    prices: z.array(Price),
    sku: z.string(),
  }),
  name: z.object({
    'en-US': z.string(),
  }),
  slug: z.object({
    'en-US': z.string(),
  }),
});

export const ProductResponseSchema = z.object({
  body: z.object({
    results: z.array(ProductProjectionSchema),
    limit: z.number(),
    offset: z.number(),
    count: z.number(),
    total: z.number(),
  }),
});
