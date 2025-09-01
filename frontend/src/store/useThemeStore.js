import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Atmosphere-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("Atmosphere-theme", theme);
    set({ theme });
  },
}));
