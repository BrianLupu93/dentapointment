import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Appointment } from "@/models/Appointment";

// ===================== PUT APPOINTMENT {id} =========================

export const PUT = apiHandler(async (req, { params }) => {
  if (!params?.id) {
    return apiError("Missing route parameter", 400);
  }

  const { id } = params;
  const body = await req.json();
  const { status } = body;

  if (!status) {
    return apiError("Status is required", 400);
  }

  const updated = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );

  if (!updated) {
    return apiError("Appointment not found", 404);
  }

  return apiSuccess(updated);
});

// ===================== DELETE APPOINTMENT {id} =========================

export const DELETE = apiHandler(async (req, { params }) => {
  if (!params?.id) {
    return apiError("Missing route parameter", 400);
  }

  const { id } = params;

  const updated = await Appointment.findByIdAndUpdate(
    id,
    { status: "cancelled" },
    { new: true },
  );

  if (!updated) {
    return apiError("Appointment not found", 404);
  }

  return apiSuccess({ message: "Appointment cancelled" });
});
