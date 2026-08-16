/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants";

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

interface FavoritesContextValue {
  favorites: string[];
  favoritesSet: ReadonlySet<string>;
  toggleFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * Provides a single shared favorites list so every consumer (cards, the
 * header counter and the favorites tab) reads and updates the same state.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    STORAGE_KEYS.favorites,
    [],
    isStringArray
  );

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  /**
   * Toggles the favorite status of a Pokemon.
   * @param pokemonName - The name of the Pokemon to toggle.
   */
  const toggleFavorite = (pokemonName: string): void => {
    setFavorites((prev) =>
      prev.includes(pokemonName)
        ? prev.filter((name) => name !== pokemonName)
        : [...prev, pokemonName]
    );
  };

  /**
   * Checks if a Pokemon is in the favorites list.
   * @param pokemonName - The name of the Pokemon to check.
   */
  const isFavorite = (pokemonName: string): boolean =>
    favoritesSet.has(pokemonName);

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoritesSet, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Custom hook for managing Pokemon favorites. Must be used within a
 * <FavoritesProvider>.
 */
export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
