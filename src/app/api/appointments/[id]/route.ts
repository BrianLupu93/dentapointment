import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Appointment } from "@/models/Appointment";
import { Service } from "@/models/Service";
import { requireAuth } from "@/lib/requireAuth";
import { updateAppointmentSchema } from "@/schemas/appointments";
import { validate } from "@/lib/validators";

// ===================== PUT APPOINTMENT =========================

export const PUT = apiHandler(
  async (req, { params }) => {
    const { id } = params;
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return apiError("Invalid JSON body", 400);
    }
    // 1. Validate input

    let data;
    try {
      data = validate(updateAppointmentSchema, body);
    } catch (err: any) {
      return apiError(err.message, 400);
    }

    const { name, email, phone, serviceId, date, startTime } = data;

    // 1. Fields Validation
    if (!name || !email || !phone || !serviceId || !date || !startTime) {
      return apiError("Missing required fields", 400);
    }

    // 2. Get the service duration from the selected service
    const service = await Service.findById(serviceId);
    if (!service) {
      return apiError("Service not found", 404);
    }

    const duration = service.duration;

    // 3. Calculate the endTime
    const [h, m] = startTime.split(":").map(Number);
    const endDate = new Date(0, 0, 0, h, m + duration);
    const endTime = endDate.toTimeString().slice(0, 5);

    // 4. Check for overlapping excluding the actual Appointmnet
    const overlapping = await Appointment.findOne({
      _id: { $ne: id },
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (overlapping) {
      return apiError("Selected time slot is no longer available", 409);
    }

    // 5. Update the Appointment
    const updated = await Appointment.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        serviceId,
        date,
        startTime,
        endTime,
      },
      { new: true },
    );

    if (!updated) {
      return apiError("Appointment not found", 404);
    }

    return apiSuccess({
      message: "Appointment updated successfully",
      appointment: updated,
    });
  },
  { auth: true },
);

// ===================== DELETE APPOINTMENT {id} =========================

export const DELETE = apiHandler(
  async (req, { params }) => {
    const { id } = params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return apiError("Appointment not found", 404);
    }
    return apiSuccess({
      message: "Appointment deleted successfully",
      appointment,
    });
  },
  { auth: true },
);
