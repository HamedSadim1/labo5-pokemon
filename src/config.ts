/** Base URL for the PokéAPI. Override with the VITE_POKE_API_URL env var. */
export const POKE_API_BASE_URL =
  import.meta.env.VITE_POKE_API_URL ?? "https://pokeapi.co/api/v2";

/** Base URL for Pokémon sprite images. Override with the VITE_SPRITE_BASE_URL env var. */
export const SPRITE_BASE_URL =
  import.meta.env.VITE_SPRITE_BASE_URL ??
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
