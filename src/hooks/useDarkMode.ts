import { useLayoutEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DARK_MODE_CLASS, STORAGE_KEYS } from "../constants";

const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

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
