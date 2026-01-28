import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(2, "Service name must be at least 2 characters")
    .max(100, "Service name is too long"),

  duration: z
    .number()
    .min(1, "Duration must be at least 1 minute")
    .max(600, "Duration cannot exceed 600 minutes"),

  active: z.boolean().optional(),
});

export const updateServiceSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  duration: z.number().min(1).max(600).optional(),
  active: z.boolean().optional(),
});
