"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";

export interface NavLinksProps {
  isLoggedIn: boolean;
  logout: () => void;
  mobile?: boolean;
}

export function NavLinks({
  isLoggedIn,
  logout,
  mobile = false,
}: NavLinksProps) {
  const baseClass = mobile ? "text-lg font-medium" : "text-sm font-medium";
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className={mobile ? "flex flex-col gap-4" : "flex items-center gap-4"}>
      <Link href='/' className={baseClass}>
        Home
      </Link>

      {isLoggedIn && (
        <>
          <Link href='/dashboard' className={baseClass}>
            Dashboard
          </Link>

          <Link href='/services' className={baseClass}>
            Services
          </Link>
        </>
      )}

      {!isLoggedIn ? (
        <Button onClick={goToLogin}>Login</Button>
      ) : (
        <Button onClick={logout}>Logout</Button>
      )}
    </div>
  );
}
