import { z } from 'zod';

export const NumberOfPiecesSchema = z.object({
  name: z.literal('numberOfPieces'),
  value: z.number(),
});

export const RecommendedAgeSchema = z.object({
  name: z.literal('recommendedAge'),
  value: z.object({
    'en-US': z.string(),
  }),
});
