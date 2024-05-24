import { z } from "zod"

export const HousesSchema = z.object({
  id: z.number(),
  description: z.string(),
  price: z.string(),
  localitation: z.string(),
  userId: z.number(),
})
