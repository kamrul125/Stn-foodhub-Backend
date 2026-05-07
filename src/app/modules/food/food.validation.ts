import { z } from "zod";

export const createFoodValidation = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().min(5),
    price: z.number().positive(),
    image: z.string().url(),
    category: z.string(),
  }),
});

export const updateFoodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
  }),
});