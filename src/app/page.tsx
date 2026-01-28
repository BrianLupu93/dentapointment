"use client";
import { ServiceSelector } from "@/components/home/service-selector";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [serviceId, setServiceId] = useState("");
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <h1 className='text-red-500 text-3xl'>HOMEPAGE</h1>

        <ServiceSelector value={serviceId} onChange={setServiceId} />
        <Button>Click me</Button>
      </main>
    </div>
  );
}
