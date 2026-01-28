import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Service } from "@/models/Service";
import { requireAuth } from "@/lib/requireAuth";
import { createServiceSchema } from "@/schemas/services";
import { validate } from "@/lib/validators";

// ===================== GET SERVICES =========================

export const GET = apiHandler(async () => {
  const services = await Service.find({ active: true }).sort({ name: 1 });
  return apiSuccess(services);
});

// ===================== POST SERVICE =========================

export const POST = apiHandler(
  async (req) => {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return apiError("Invalid JSON body", 400);
    }
    // Validate with Zod
    let data;
    try {
      data = validate(createServiceSchema, body);
    } catch (err: any) {
      return apiError(err.message, 400);
    }

    const { name, duration } = data;
    if (!name || !duration) {
      return apiError("Name and duration are required", 400);
    }
    const newService = await Service.create({ name, duration, active: true });
    return apiSuccess(newService, 201);
  },
  { auth: true },
);
