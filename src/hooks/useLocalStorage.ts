import { useEffect, useState } from "react";
import { parseStoredValue } from "../utils/storage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return parseStoredValue(
        window.localStorage.getItem(key),
        initialValue,
        validate
      );
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Persist to localStorage whenever the value changes. Skip no-op writes so we
  // don't fire a `storage` event that would ping-pong back from other tabs.
  useEffect(() => {
    try {
      const serialized = JSON.stringify(storedValue);
      if (window.localStorage.getItem(key) !== serialized) {
        window.localStorage.setItem(key, serialized);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Sync state when the same key is changed in another tab.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      setStoredValue(parseStoredValue(event.newValue, initialValue, validate));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue, validate]);

  return [storedValue, setStoredValue] as const;
}
