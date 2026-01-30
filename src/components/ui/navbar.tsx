"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";
import { TbDental } from "react-icons/tb";
import { ThemeSwitch } from "./theme-switch";
import { NavLinks } from "./nav-links";
import { IoMenu } from "react-icons/io5";

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className='border-b bg-background'>
      <div className='w-full max-w-5xl mx-auto flex h-16 items-center justify-between px-8 sm:px-16'>
        {/* Logo */}
        <TbDental size={30} />
        {/* Desktop */}
        <div className='hidden md:flex items-center gap-6'>
          <ThemeSwitch />
          <NavLinks isLoggedIn={isLoggedIn} logout={logout} />
        </div>
        {/* Mobile */}
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <IoMenu size={30} aria-label='Open menu' />
            </SheetTrigger>
            <SheetContent side='right' className='w-64'>
              <div className='mt-10 flex flex-col gap-6'>
                <ThemeSwitch />
                <NavLinks isLoggedIn={isLoggedIn} logout={logout} mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
