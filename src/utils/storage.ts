/**
 * Parses and validates a raw localStorage string into a typed value, falling
 * back to `initialValue` on missing, corrupt or invalid data.
 */
export function parseStoredValue<T>(
  raw: string | null,
  initialValue: T,
  validate?: (value: unknown) => value is T
): T {
  if (raw === null) return initialValue;
  try {
    const parsed: unknown = JSON.parse(raw);
    return validate ? (validate(parsed) ? parsed : initialValue) : (parsed as T);
  } catch {
    return initialValue;
  }
}
