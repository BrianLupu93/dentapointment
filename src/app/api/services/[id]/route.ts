import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Service } from "@/models/Service";
import { requireAuth } from "@/lib/requireAuth";
import { unknown } from "zod";
import { updateServiceSchema } from "@/schemas/services";
import { validate } from "@/lib/validators";

// ===================== PUT SERVICE {id} =========================

export const PUT = apiHandler(
  async (req, { params }) => {
    if (!params?.id) {
      return apiError("Missing route parameter", 400);
    }
    const { id } = params;
    let body = unknown;

    try {
      body = await req.json();
    } catch {
      return apiError("Invalid JSON body", 400);
    }

    // Validate with Zod
    let data;
    try {
      data = validate(updateServiceSchema, body);
    } catch (err: any) {
      return apiError(err.message, 400);
    }
    const { name, duration, active } = data;

    const updated = await Service.findByIdAndUpdate(
      id,
      { name, duration, active },
      { new: true },
    );

    if (!updated) {
      return apiError("Service not found", 404);
    }

    return apiSuccess(updated);
  },
  { auth: true },
);

// ===================== DELETE SERVICE {id} =========================

export const DELETE = apiHandler(
  async (req, { params }) => {
    if (!params?.id) {
      return apiError("Missing route parameter", 400);
    }
    const { id } = params;

    const updated = await Service.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );

    if (!updated) {
      return apiError("Service not found", 404);
    }
    return apiSuccess({ message: "Service deactivated" });
  },
  { auth: true },
);
