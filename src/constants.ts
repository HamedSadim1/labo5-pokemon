/**
 * App-wide constants: storage keys, pagination sizes, request tuning and
 * shared UI types. Centralizes magic numbers/strings so they have one source
 * of truth.
 */

export const STORAGE_KEYS = {
  favorites: "pokemon-favorites",
  darkMode: "dark-mode",
} as const;

export const LIST_LIMIT = 100000;

export const DEBOUNCE_MS = 300;

export const SKELETON_COUNT = 8;

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export const DEFAULT_PAGE_SIZE = 20;

export const MAX_VISIBLE_PAGES = 7;

/** PokeAPI returns height/weight in decimetres/decagrams (1 m = 10 dm). */
export const DECIMETERS_PER_METER = 10;

/** Highest possible base stat value in Pokémon (used for the stat bars). */
export const MAX_BASE_STAT = 255;

export type PokemonTab = "all" | "favorites";
