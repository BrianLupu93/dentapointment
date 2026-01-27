import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Appointment } from "@/models/Appointment";
import { Service } from "@/models/Service";

// ===================== GET AVAILABILITY =========================

export const GET = apiHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");

  if (!serviceId || !date) {
    return apiError("serviceId and date are required", 400);
  }

  // 1. Get the Service duration
  const service = await Service.findById(serviceId);
  if (!service) {
    return apiError("Service not found", 404);
  }

  const duration = service.duration;

  // 2. Set the working program
  const workStart = "09:00";
  const workEnd = "17:00";

  // 3. Generate all the possible slots
  const slots: string[] = [];
  let [h, m] = workStart.split(":").map(Number);
  const [endH, endM] = workEnd.split(":").map(Number);

  while (h < endH || (h === endH && m < endM)) {
    const start = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

    const endDate = new Date(0, 0, 0, h, m + duration);
    const end = endDate.toTimeString().slice(0, 5);

    if (end <= workEnd) {
      slots.push(start);
    }

    m += duration;
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    }
  }

  // 4. Get the existent appointments
  const appointments = await Appointment.find({ date });

  // 5. Filter the empty slots
  const available = slots.filter((slot) => {
    const [sh, sm] = slot.split(":").map(Number);
    const endDate = new Date(0, 0, 0, sh, sm + duration);
    const slotEnd = endDate.toTimeString().slice(0, 5);

    const overlapping = appointments.some((a) => {
      return a.startTime < slotEnd && a.endTime > slot;
    });

    return !overlapping;
  });

  return apiSuccess(available);
});
