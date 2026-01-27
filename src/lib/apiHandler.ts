import { connectDB } from "@/lib/db";
import { apiError } from "@/lib/response";

type HandlerFn = (
  req: Request,
  context: { params: Record<string, string> },
) => Promise<Response>;

export function apiHandler(handler: HandlerFn) {
  return async (
    req: Request,
    context: { params: Record<string, string> },
  ): Promise<Response> => {
    try {
      await connectDB();
      return await handler(req, context);
    } catch (error) {
      return apiError("Internal server error", 500, error);
    }
  };
}
