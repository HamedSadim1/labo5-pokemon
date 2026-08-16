import { useLayoutEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DARK_MODE_CLASS, STORAGE_KEYS } from "@/constants";
import { isBoolean } from "@/utils/guards";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    STORAGE_KEYS.darkMode,
    false,
    isBoolean
  );

  useLayoutEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(DARK_MODE_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_MODE_CLASS);
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return { darkMode, toggleDarkMode };
}
