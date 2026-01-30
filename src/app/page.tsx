"use client";
import ClientForm from "@/components/forms/client-form";
import HomeTitle from "@/components/home/home-title";
import { PageLayout } from "@/components/ui/page-layout";
import HomeCalendar from "@/components/home/home-calendar";

export default function Home() {
  return (
    <PageLayout>
      <HomeTitle />
      <div className='w-full flex flex-col sm:flex-row  gap-4 p-6 border border-black dark:border-white rounded-md'>
        <ClientForm />
        <HomeCalendar />
      </div>
    </PageLayout>
  );
}
