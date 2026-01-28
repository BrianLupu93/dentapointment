import { apiHandler } from "@/lib/apiHandler";
import { apiSuccess, apiError } from "@/lib/response";
import { Appointment } from "@/models/Appointment";
import { Service } from "@/models/Service";

// ===================== GET AVAILABILITY FOR A SELECTED SERVICE =========================

export const GET = apiHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // ex: 2024-05
  const serviceId = searchParams.get("serviceId");

  if (!month || !serviceId) {
    return apiError("month and serviceId are required", 400);
  }

  // 1. Get the selected service duration
  const service = await Service.findById(serviceId);
  if (!service) {
    return apiError("Service not found", 404);
  }

  const duration = service.duration;

  // 2. Set the work program (TEST)
  const workStart = "09:00";
  const workEnd = "17:00";

  const [year, monthNum] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();

  const result: Record<string, boolean> = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dateObj = new Date(dateStr);

    // A. Only from today date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj < today) {
      result[dateStr] = false;
      continue;
    }

    // B. No weekend days
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      result[dateStr] = false;
      continue;
    }

    // C. Gett all the selected day appointments sorted
    const appointments = await Appointment.find({ date: dateStr }).sort({
      startTime: 1,
    });

    // D. Check if a slot is available for the seleted service
    const hasFreeSlot = checkDayHasFreeSlot(
      appointments,
      workStart,
      workEnd,
      duration,
    );

    result[dateStr] = hasFreeSlot;
  }

  return apiSuccess(result);
});

// ===================== Function to check the available slots =========================

function checkDayHasFreeSlot(
  appointments: any[],
  workStart: string,
  workEnd: string,
  duration: number,
): boolean {
  // Transform hour to miniutes
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const workStartMin = toMinutes(workStart);
  const workEndMin = toMinutes(workEnd);

  // 1. Check the interval from the start work hour till the
  //    first appointment startTime

  let lastEnd = workStartMin;

  for (const a of appointments) {
    const start = toMinutes(a.startTime);
    const end = toMinutes(a.endTime);

    if (start - lastEnd >= duration) {
      return true; // We have time for the selected service
    }

    if (end > lastEnd) {
      lastEnd = end;
    }
  }

  // 2. Verificăm intervalul de la ultima programare până la workEnd
  //    Check the interval time from the last appointment endTime till
  //    till the end time of the working program
  if (workEndMin - lastEnd >= duration) {
    return true;
  }

  return false;
}
