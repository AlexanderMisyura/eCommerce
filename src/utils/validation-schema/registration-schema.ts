import { z } from 'zod';

const AddressSchema = z.object({
  streetName: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export const RegistrationSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  addresses: z.array(AddressSchema),
  shippingAddresses: z.array(z.number()),
  billingAddresses: z.array(z.number()),
  defaultBillingAddress: z.number().optional(),
  defaultShippingAddress: z.number().optional(),
});
