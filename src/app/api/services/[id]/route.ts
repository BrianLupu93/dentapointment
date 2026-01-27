import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Service } from "@/models/Service";

// ===================== PUT SERVICE {id} =========================

export const PUT = apiHandler(async (req, { params }) => {
  if (!params?.id) {
    return apiError("Missing route parameter", 400);
  }
  const { id } = params;
  const body = await req.json();
  const { name, duration, active } = body;

  const updated = await Service.findByIdAndUpdate(
    id,
    { name, duration, active },
    { new: true },
  );

  if (!updated) {
    return apiError("Service not found", 404);
  }

  return apiSuccess(updated);
});

// ===================== DELETE SERVICE {id} =========================

export const DELETE = apiHandler(async (req, { params }) => {
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
});
