import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import {
  type IPokemon,
  type Result,
  type PokemonDetail,
} from "../Services/PokemonInterface";
import { useFavorites } from "../hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { HeartOff, RefreshCw, SearchX } from "lucide-react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";
import PokemonModal from "./PokemonModal";

const REQUEST_TIMEOUT_MS = 15000;

/**
 * Main Pokemon component: loads the full Pokemon list once, then handles
 * search, favorites filtering, pagination and the detail modal on the client.
 */
const Pokemon: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const [filterInput, setFilterInput] = useState<string>("");
  const [debouncedFilterInput, setDebouncedFilterInput] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const detailUrlRef = useRef<string | null>(null);
  const detailAbortRef = useRef<AbortController | null>(null);

  const { favorites } = useFavorites();

  // Fetch the full Pokemon list once (and again on retry).
  useEffect(() => {
    let active = true;

    axios
      .get<IPokemon>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", {
        timeout: REQUEST_TIMEOUT_MS,
      })
      .then((response) => {
        if (!active) return;
        const { results } = response.data;
        if (Array.isArray(results)) {
          setAllPokemon(results);
        } else {
          setError("Failed to load Pokémon. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error fetching Pokemon:", err);
        if (active) setError("Failed to load Pokémon. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Abort any in-flight detail request when the component unmounts.
  useEffect(() => {
    return () => {
      detailAbortRef.current?.abort();
    };
  }, []);

  // Debounce the search input so filtering doesn't run on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterInput(filterInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterInput]);

  // Filter the full list by search query and active tab.
  const filteredPokemon = useMemo(
    () =>
      allPokemon.filter((pokemon) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(debouncedFilterInput.toLowerCase());
        const matchesTab =
          activeTab === "favorites" ? favorites.includes(pokemon.name) : true;
        return matchesSearch && matchesTab;
      }),
    [allPokemon, debouncedFilterInput, activeTab, favorites]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / limit));

  // Clamp the page during render when the number of pages shrinks
  // (e.g. after unfavoriting). This is the React "adjust state during render"
  // pattern and avoids the cascade of a setState-in-effect.
  if (page > totalPages) {
    setPage(totalPages);
  }

  const safePage = Math.min(page, totalPages);
  const paginatedPokemon = filteredPokemon.slice(
    (safePage - 1) * limit,
    safePage * limit
  );

  /**
   * Opens the detail modal immediately and loads the Pokemon details,
   * showing a spinner and (on failure) a retry state inside the modal.
   */
  const openPokemonDetail = (url: string): void => {
    detailUrlRef.current = url;
    setSelectedPokemon(null);
    setDetailError(null);
    setModalOpen(true);

    // Abort any in-flight detail request so a slow response for a previous
    // Pokémon can't overwrite the newly selected one.
    detailAbortRef.current?.abort();
    const controller = new AbortController();
    detailAbortRef.current = controller;

    void axios
      .get<PokemonDetail>(url, {
        signal: controller.signal,
        timeout: REQUEST_TIMEOUT_MS,
      })
      .then((response) => {
        setSelectedPokemon(response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        console.error("Error fetching Pokemon detail:", err);
        setDetailError("Failed to load this Pokémon. Please try again.");
      });
  };

  const retryDetail = (): void => {
    if (detailUrlRef.current) {
      openPokemonDetail(detailUrlRef.current);
    }
  };

  const handleSearchChange = (value: string): void => {
    setFilterInput(value);
    setPage(1);
  };

  const handleLimitChange = (value: number): void => {
    setLimit(value);
    setPage(1);
  };

  const handleTabChange = (tab: "all" | "favorites"): void => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleRetry = (): void => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  let emptyMessage = "No Pokémon found.";
  if (activeTab === "favorites") {
    emptyMessage = "No favorite Pokémon yet. Tap the heart on a card to add one.";
  } else if (filterInput.trim()) {
    emptyMessage = `No Pokémon found for "${filterInput}".`;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <SearchBar
        filterInput={filterInput}
        onFilterChange={handleSearchChange}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button variant="outline" onClick={handleRetry}>
            <RefreshCw />
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && filteredPokemon.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border p-10 text-center">
          {activeTab === "favorites" ? (
            <HeartOff className="size-8 text-muted-foreground" />
          ) : (
            <SearchX className="size-8 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      )}

      {!loading && !error && filteredPokemon.length > 0 && (
        <>
          <PokemonGrid
            pokemon={paginatedPokemon}
            onPokemonClick={openPokemonDetail}
          />
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        error={detailError}
        onRetry={retryDetail}
      />
    </div>
  );
};

export default Pokemon;
