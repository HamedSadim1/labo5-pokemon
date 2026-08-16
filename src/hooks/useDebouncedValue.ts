import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates `delayMs` after the
 * last change. Useful for deferring expensive work (e.g. filtering) while typing.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
