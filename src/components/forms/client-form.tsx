import React from "react";
import { Input } from "../ui/input";
import { ServiceSelector } from "../home/service-selector";
import { TimeSelector } from "../home/time-selector";

const ClientForm = () => {
  return (
    <div className='w-full sm:w-1/2 flex flex-col gap-4'>
      <div>Personal information</div>
      <Input placeholder='Full Name' />
      <Input placeholder='E-mail' />
      <Input placeholder='Phone' />
      <div className='mt-4 flex flex-col gap-4'>
        <div>Select a service</div>
        <ServiceSelector />
        <div>Select time</div>
        <TimeSelector />
      </div>
    </div>
  );
};

export default ClientForm;
