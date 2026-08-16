/**
 * Single source of truth for app-wide constants: storage keys, request tuning,
 * layout classes, domain values and user-facing copy.
 *
 * Grouped by concern; add new values here instead of inlining them.
 */

/* ---------------------------------------------------------------- */
/* Storage & theme                                                  */
/* ---------------------------------------------------------------- */

export const STORAGE_KEYS = {
  favorites: "pokemon-favorites",
  darkMode: "dark-mode",
} as const;

/** Class added to <html> for dark mode; must match `.dark` in index.css. */
export const DARK_MODE_CLASS = "dark";

/* ---------------------------------------------------------------- */
/* API & requests                                                   */
/* ---------------------------------------------------------------- */

export const LIST_LIMIT = 100000;

export const REQUEST_TIMEOUT_MS = 15000;

/** Axios error code emitted when a request times out. */
export const AXIOS_TIMEOUT_CODE = "ECONNABORTED";

export const TIMEOUT_MESSAGE = "The request timed out. Please try again.";
export const GENERIC_LIST_ERROR_MESSAGE = "Failed to load Pokémon. Please try again.";
export const GENERIC_DETAIL_ERROR_MESSAGE = "Failed to load this Pokémon. Please try again.";

/* ---------------------------------------------------------------- */
/* Interaction tuning                                               */
/* ---------------------------------------------------------------- */

export const DEBOUNCE_MS = 300;

export const SKELETON_COUNT = 8;

/* ---------------------------------------------------------------- */
/* Pagination                                                       */
/* ---------------------------------------------------------------- */

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

/** Default items-per-page, derived from PAGE_SIZE_OPTIONS (single source). */
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[1];

export const MAX_VISIBLE_PAGES = 7;

/* ---------------------------------------------------------------- */
/* Pokémon domain                                                   */
/* ---------------------------------------------------------------- */

/** PokeAPI returns height/weight in decimetres/decagrams (1 m = 10 dm). */
export const DECIMETERS_PER_METER = 10;

/** Highest possible base stat value in Pokémon (used for the stat bars). */
export const MAX_BASE_STAT = 255;

/** Width of the zero-padded Pokédex number (e.g. #001). */
export const DEX_NUMBER_WIDTH = 3;

/* ---------------------------------------------------------------- */
/* Layout                                                           */
/* ---------------------------------------------------------------- */

/** Shared responsive grid layout for the Pokémon grid and its skeleton. */
export const POKEMON_GRID_CLASS =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

/** Shared page-width container. */
export const CONTAINER_CLASS = "mx-auto w-full max-w-6xl";

/** Max-height of the scrollable modal body. */
export const MODAL_BODY_MAX_HEIGHT_CLASS = "max-h-[calc(90dvh-10rem)]";

/* ---------------------------------------------------------------- */
/* Tabs                                                             */
/* ---------------------------------------------------------------- */

export const TABS = {
  all: "all",
  favorites: "favorites",
} as const;

export type PokemonTab = (typeof TABS)[keyof typeof TABS];

/* ---------------------------------------------------------------- */
/* User-facing copy                                                 */
/* ---------------------------------------------------------------- */

export const TEXT = {
  appTitle: "Pokémon Explorer",
  appSubtitle: "Discover and explore the world of Pokémon",
  skipToContent: "Skip to content",

  tabAll: "All Pokémon",
  tabFavorites: "Favorites",
  toggleDarkMode: "Toggle dark mode",

  searchPlaceholder: "Search Pokémon...",
  searchLabel: "Search Pokémon",
  clearSearch: "Clear search",
  itemsPerPage: "Items per page",
  itemsPerPageSuffix: "per page",

  paginationPrevious: "Previous",
  paginationNext: "Next",
  pageLabel: (page: number): string => `Page ${page}`,

  retry: "Try again",

  errorTitle: "Something went wrong",
  errorBody: "An unexpected error occurred. Please reload the page.",
  reload: "Reload",

  noImage: "No image",
  loading: "Loading…",

  modalDescription: "Pokémon details",
  statHeight: "Height",
  statWeight: "Weight",
  sectionAbilities: "Abilities",
  sectionStats: "Stats",
  hiddenAbility: "(hidden)",
  unitMeters: "m",
  unitKilograms: "kg",

  toastAddedToFavorites: (name: string): string => `${name} added to favorites`,
  toastRemovedFromFavorites: (name: string): string =>
    `${name} removed from favorites`,
  toggleFavoriteLabel: (name: string): string => `Toggle favorite for ${name}`,

  emptyNoPokemon: "No Pokémon found.",
  emptyNoFavorites:
    "No favorite Pokémon yet. Tap the heart on a card to add one.",
  emptyNoSearchResults: (query: string): string =>
    `No Pokémon found for "${query}".`,

  resultCount: (first: number, last: number, total: number): string =>
    `Showing ${first}–${last} of ${total} Pokémon`,

  favoritesContextError: "useFavorites must be used within a FavoritesProvider",
};
