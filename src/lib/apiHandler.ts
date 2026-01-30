import { connectDB } from "@/lib/db";
import { apiError } from "@/lib/response";
import { requireAuth } from "@/lib/requireAuth";
import { ApiContext } from "@/types";
import { rateLimit } from "./rateLimit";

type HandlerFn = (req: Request, context: ApiContext) => Promise<Response>;

export function apiHandler(
  handler: HandlerFn,
  options?: { auth?: boolean; rateLimit?: { windowMs: number; max: number } },
) {
  return async (req: Request, context: ApiContext): Promise<Response> => {
    try {
      await connectDB();

      if (options?.auth) {
        const user = requireAuth(req);
        context.user = user;
      }

      if (options?.rateLimit) {
        rateLimit(req, options.rateLimit);
      }

      return await handler(req, context);
    } catch (error: any) {
      return apiError(error.message || "Internal server error", 500, error);
    }
  };
}
