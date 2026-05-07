import { z } from "zod";

export const createOrderValidation = z.object({
  body: z.object({
    foodId: z.string(),
    quantity: z.number().positive(),
  }),
});