type RateLimitOptions = {
  windowMs: number; // milliseconds
  max: number; // requests
};

const ipStore = new Map<string, { count: number; expires: number }>();

export function rateLimit(req: Request, options: RateLimitOptions) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || record.expires < now) {
    ipStore.set(ip, {
      count: 1,
      expires: now + options.windowMs,
    });
    return;
  }

  record.count++;

  if (record.count > options.max) {
    throw new Error("Too many requests, slow down");
  }

  ipStore.set(ip, record);
}
