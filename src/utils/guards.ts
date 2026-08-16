/**
 * Runtime type guards, mostly used to validate unknown values read from
 * localStorage before trusting them as a specific type.
 */

export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
