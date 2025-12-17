import { useLocalStorage } from "./useLocalStorage";

/**
 * Custom hook for managing Pokemon favorites using local storage.
 * Provides functions to toggle favorites and check if a Pokemon is favorited.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "pokemon-favorites",
    []
  );

  /**
   * Toggles the favorite status of a Pokemon.
   * @param pokemonName - The name of the Pokemon to toggle.
   */
  const toggleFavorite = (pokemonName: string) => {
    setFavorites((prev) =>
      prev.includes(pokemonName)
        ? prev.filter((name) => name !== pokemonName)
        : [...prev, pokemonName]
    );
  };

  /**
   * Checks if a Pokemon is in the favorites list.
   * @param pokemonName - The name of the Pokemon to check.
   * @returns True if the Pokemon is favorited, false otherwise.
   */
  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

  return { favorites, toggleFavorite, isFavorite };
}
