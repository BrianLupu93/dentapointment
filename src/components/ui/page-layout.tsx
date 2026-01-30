import { ReactNode } from "react";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex min-h-screen items-center justify-center font-sans'>
      <div className='flex min-h-screen w-full max-w-5xl flex-col py-6 sm:py-12 px-8 sm:px-16 sm:items-start'>
        {children}
      </div>
    </main>
  );
}
