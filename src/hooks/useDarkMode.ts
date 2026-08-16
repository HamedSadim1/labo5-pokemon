import { useLayoutEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants";

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
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return { darkMode, toggleDarkMode };
}
