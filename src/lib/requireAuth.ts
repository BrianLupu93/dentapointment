import { verifyAccessToken } from "@/lib/auth";

export function requireAuth(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    throw new Error("Unauthorized");
  }

  const token = auth.replace("Bearer ", "");

  try {
    const decoded = verifyAccessToken(token);
    return decoded;
  } catch {
    throw new Error("Unauthorized");
  }
}
