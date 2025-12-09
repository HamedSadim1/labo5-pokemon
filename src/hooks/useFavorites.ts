import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "pokemon-favorites",
    []
  );

  const toggleFavorite = (pokemonName: string) => {
    setFavorites((prev) =>
      prev.includes(pokemonName)
        ? prev.filter((name) => name !== pokemonName)
        : [...prev, pokemonName]
    );
  };

  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

  return { favorites, toggleFavorite, isFavorite };
}
