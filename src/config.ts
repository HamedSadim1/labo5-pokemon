/** Base URL for the PokéAPI. Override with the VITE_POKE_API_URL env var. */
export const POKE_API_BASE_URL =
  import.meta.env.VITE_POKE_API_URL ?? "https://pokeapi.co/api/v2";
