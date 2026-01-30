"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/theme-context";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id='theme-mode'
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor='theme-mode'>
        Dark: {theme === "dark" ? "On" : "Off"}
      </Label>
    </div>
  );
}
