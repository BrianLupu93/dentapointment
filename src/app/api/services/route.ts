import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Service } from "@/models/Service";

// ===================== GET SERVICES =========================

export const GET = apiHandler(async () => {
  const services = await Service.find({ active: true }).sort({ name: 1 });
  return apiSuccess(services);
});

// ===================== POST SERVICE =========================

export const POST = apiHandler(async (req) => {
  const body = await req.json();
  const { name, duration } = body;
  if (!name || !duration) {
    return apiError("Name and duration are required", 400);
  }
  const newService = await Service.create({ name, duration, active: true });
  return apiSuccess(newService, 201);
});
