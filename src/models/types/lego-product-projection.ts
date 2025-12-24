import type { ProductProjectionSchema } from '@schemas';
import type { z } from 'zod';

export type LegoProductProjection = z.infer<typeof ProductProjectionSchema>;
