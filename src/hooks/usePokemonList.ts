import { useEffect, useState } from "react";
import axios from "axios";
import { type IPokemon, type Result } from "@/Services/PokemonInterface";
import { POKE_API_BASE_URL } from "@/config";
import {
  GENERIC_LIST_ERROR_MESSAGE,
  LIST_LIMIT,
  REQUEST_TIMEOUT_MS,
  TIMEOUT_MESSAGE,
} from "@/constants";
import { isTimeout } from "@/utils/axios";

interface UsePokemonListResult {
  allPokemon: Result[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

/**
 * Loads the full Pokémon list once and exposes loading/error state plus a
 * retry function.
 */
export function usePokemonList(): UsePokemonListResult {
  const [allPokemon, setAllPokemon] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    let active = true;

    axios
      .get<IPokemon>(`${POKE_API_BASE_URL}/pokemon?limit=${LIST_LIMIT}&offset=0`, {
        timeout: REQUEST_TIMEOUT_MS,
      })
      .then((response) => {
        if (!active) return;
        const { results } = response.data;
        if (Array.isArray(results)) {
          setAllPokemon(results);
        } else {
          setError(GENERIC_LIST_ERROR_MESSAGE);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          console.error("Error fetching Pokemon:", err);
          setError(isTimeout(err) ? TIMEOUT_MESSAGE : GENERIC_LIST_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retry = (): void => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  return { allPokemon, loading, error, retry };
}
