import { z } from "zod";

export const createAppointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(6, "Phone number is too short"),
  serviceId: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (expected HH:MM)"),
});

export const updateAppointmentSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  serviceId: z.string().optional(),
  date: z.string().optional(),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
});

export const getAppointmentsByDaySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});
