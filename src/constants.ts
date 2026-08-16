/**
 * App-wide constants: storage keys, pagination sizes, request tuning and
 * shared UI types. Centralizes magic numbers/strings so they have one source
 * of truth.
 */

export const STORAGE_KEYS = {
  favorites: "pokemon-favorites",
  darkMode: "dark-mode",
} as const;

/** Class added to <html> for dark mode; must match `.dark` in index.css. */
export const DARK_MODE_CLASS = "dark";

export const LIST_LIMIT = 100000;

export const REQUEST_TIMEOUT_MS = 15000;

/** Axios error code emitted when a request times out. */
export const AXIOS_TIMEOUT_CODE = "ECONNABORTED";

export const DEBOUNCE_MS = 300;

export const SKELETON_COUNT = 8;

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

/** Default items-per-page, derived from PAGE_SIZE_OPTIONS (single source). */
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[1];

export const MAX_VISIBLE_PAGES = 7;

/** PokeAPI returns height/weight in decimetres/decagrams (1 m = 10 dm). */
export const DECIMETERS_PER_METER = 10;

/** Highest possible base stat value in Pokémon (used for the stat bars). */
export const MAX_BASE_STAT = 255;

/** Width of the zero-padded Pokédex number (e.g. #001). */
export const DEX_NUMBER_WIDTH = 3;

/** Shared responsive grid layout for the Pokémon grid and its skeleton. */
export const POKEMON_GRID_CLASS =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

/** Shared page-width container. */
export const CONTAINER_CLASS = "mx-auto w-full max-w-6xl";

export const TABS = {
  all: "all",
  favorites: "favorites",
} as const;

export type PokemonTab = (typeof TABS)[keyof typeof TABS];
