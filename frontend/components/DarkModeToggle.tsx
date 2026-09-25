"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-[#F4F3EF] dark:bg-[#0E1223] hover:bg-[#E7E5DE] dark:hover:bg-[#334155] transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
