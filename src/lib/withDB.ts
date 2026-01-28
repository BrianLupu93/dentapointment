import { connectDB } from "@/lib/db";

export function withDB(handler: Function) {
  return async function (req: Request, context: any) {
    await connectDB();
    return handler(req, context);
  };
}
