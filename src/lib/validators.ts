import { ZodType } from "zod";

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Invalid data";
    throw new Error(message);
  }

  return parsed.data;
}
