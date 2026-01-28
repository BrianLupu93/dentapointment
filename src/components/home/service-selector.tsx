"use client";

import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Service {
  _id: string;
  name: string;
  duration: number;
}

interface ServiceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceSelector({ value, onChange }: ServiceSelectorProps) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function loadServices() {
      const res = await fetch("/api/services");
      const json = await res.json();
      setServices(json.data || []);
    }
    loadServices();
  }, []);

  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium'>Alege serviciul</h3>

      <ToggleGroup
        type='single'
        value={value}
        onValueChange={(val) => val && onChange(val)}
        className='flex flex-wrap gap-2'
      >
        {services.map((service) => (
          <ToggleGroupItem
            key={service._id}
            value={service._id}
            className='
              px-4 py-2 rounded-full border
              data-[state=on]:bg-primary data-[state=on]:text-primary-foreground
              data-[state=off]:bg-muted
            '
          >
            {service.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
