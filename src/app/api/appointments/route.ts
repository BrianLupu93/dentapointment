import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Appointment } from "@/models/Appointment";
import { Service } from "@/models/Service";
import {
  createAppointmentSchema,
  getAppointmentsByDaySchema,
} from "@/schemas/appointments";
import { validate } from "@/lib/validators";

// ===================== POST APPOINTMENT =========================

export const POST = apiHandler(
  async (req) => {
    let body: unknown;

    // 1. Validate input with Zod
    let data;
    try {
      data = validate(createAppointmentSchema, body);
    } catch (err: any) {
      return apiError(err.message, 400);
    }

    const { name, email, phone, serviceId, date, startTime } = data;

    // 1. Validate the input
    if (!name || !email || !phone || !serviceId || !date || !startTime) {
      return apiError("Missing required fields", 400);
    }

    // 2. Get the selected service to know the duration
    const service = await Service.findById(serviceId);
    if (!service) {
      return apiError("Service not found", 404);
    }

    const duration = service.duration;

    // 3. Calculate the endTime
    const [h, m] = startTime.split(":").map(Number);
    const endDate = new Date(0, 0, 0, h, m + duration);
    const endTime = endDate.toTimeString().slice(0, 5);

    // 4. Check for overlapping
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
      return apiError("Selected time slot is no longer available", 409);
    }

    // 5. Create the appointment
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      serviceId,
      date,
      startTime,
      endTime,
    });

    return apiSuccess({
      message: "Appointment created successfully",
      appointment,
    });
  },
  { auth: true, rateLimit: { windowMs: 10_000, max: 3 } },
);

// ===================== GET APPOINTMENTS =========================

export const GET = apiHandler(
  async (req) => {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const month = searchParams.get("month");

    //  GET appointments by day
    if (date) {
      const appointments = await Appointment.find({ date })
        .populate("serviceId")
        .sort({ startTime: 1 });

      return apiSuccess(appointments);
    }

    // 2. GET appointments by month (count per day)
    if (month) {
      // month = "2025-02"
      const regex = new RegExp(`^${month}-\\d{2}$`);
      const appointments = await Appointment.find({ date: regex });
      const counts: Record<string, number> = {};

      appointments.forEach((appt) => {
        counts[appt.date] = (counts[appt.date] || 0) + 1;
      });
      return apiSuccess(counts);
    }

    // 3. GET all appointments
    const all = await Appointment.find()
      .populate("serviceId")
      .sort({ date: 1, startTime: 1 });

    return apiSuccess(all);
  },
  { auth: true },
);
