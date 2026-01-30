"use client";

import { Card, CardContent } from "@/components/ui/card";

import React from "react";
import { Calendar } from "../ui/calendar";

export default function HomeCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3),
  );
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i),
  );

  return (
    <Calendar
      className='w-full rounded-md'
      mode='single'
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={bookedDates}
      modifiers={{
        booked: bookedDates,
      }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
    />
  );
}
