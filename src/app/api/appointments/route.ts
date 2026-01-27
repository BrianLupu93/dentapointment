import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Appointment } from "@/models/Appointment";
import { Service } from "@/models/Service";

// ===================== GET APPOINTMENTS =========================

export const GET = apiHandler(async () => {
  const appointments = await Appointment.find()
    .populate("serviceId")
    .sort({ date: 1, startTime: 1 });

  return apiSuccess(appointments);
});

// ===================== POST APPOINTMENT =========================

export const POST = apiHandler(async (req) => {
  const body = await req.json();
  const { serviceId, name, email, phone, date, startTime } = body;

  if (!serviceId || !name || !email || !phone || !date || !startTime) {
    return apiError("Missing required fields", 400);
  }

  // 1. Get the service duration
  const service = await Service.findById(serviceId);
  if (!service) {
    return apiError("Service not found", 404);
  }

  const duration = service.duration;

  // 2. Calculate the endTime
  const [h, m] = startTime.split(":").map(Number);
  const endDate = new Date(0, 0, 0, h, m + duration);
  const endTime = endDate.toTimeString().slice(0, 5);

  // 3. Check for overlapping
  const overlapping = await Appointment.findOne({
    date,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
  });

  if (overlapping) {
    return apiError("Time slot is already booked", 409);
  }

  // 4. Create Appointment
  const newAppointment = await Appointment.create({
    serviceId,
    name,
    email,
    phone,
    date,
    startTime,
    endTime,
    status: "confirmed",
  });

  return apiSuccess(newAppointment, 201);
});
