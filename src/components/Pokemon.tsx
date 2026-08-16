import React, { useMemo, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {
  CONTAINER_CLASS,
  DEBOUNCE_MS,
  DEFAULT_PAGE_SIZE,
  TABS,
  type PokemonTab,
} from "../constants";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ErrorState from "./ErrorState";
import PokemonEmptyState from "./PokemonEmptyState";
import PokemonSkeleton from "./PokemonSkeleton";
import PokemonGrid from "./PokemonGrid";
import PokemonResultCount from "./PokemonResultCount";
import Pagination from "./Pagination";
import PokemonModal from "./PokemonModal";

/**
 * Main Pokemon component: orchestrates the list/detail hooks and the search,
 * favorites filtering and pagination of the client-side grid.
 */
const Pokemon: React.FC = () => {
  const { allPokemon, loading, error, retry } = usePokemonList();
  const {
    selectedPokemon,
    modalOpen,
    detailError,
    openPokemonDetail,
    retryDetail,
    closeModal,
  } = usePokemonDetail();

  const [filterInput, setFilterInput] = useState<string>("");
  const debouncedFilterInput = useDebouncedValue(filterInput, DEBOUNCE_MS);
  const [limit, setLimit] = useState<number>(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<PokemonTab>(TABS.all);

  const { favoritesSet } = useFavorites();

  // Filter the full list by search query and active tab.
  const filteredPokemon = useMemo(() => {
    const query = debouncedFilterInput.toLowerCase();

    return allPokemon.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(query);
      const matchesTab =
        activeTab === TABS.favorites ? favoritesSet.has(pokemon.name) : true;
      return matchesSearch && matchesTab;
    });
  }, [allPokemon, debouncedFilterInput, activeTab, favoritesSet]);

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
  const totalResults = filteredPokemon.length;
  const firstResult = totalResults === 0 ? 0 : (safePage - 1) * limit + 1;
  const lastResult = Math.min(safePage * limit, totalResults);

  const handleSearchChange = (value: string): void => {
    setFilterInput(value);
    setPage(1);
  };

  const handleLimitChange = (value: number): void => {
    setLimit(value);
    setPage(1);
  };

  const handleTabChange = (tab: PokemonTab): void => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className={CONTAINER_CLASS}>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <SearchBar
        filterInput={filterInput}
        onFilterChange={handleSearchChange}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      {loading && <PokemonSkeleton />}

      {!loading && error && <ErrorState message={error} onRetry={retry} />}

      {!loading && !error && filteredPokemon.length === 0 && (
        <PokemonEmptyState activeTab={activeTab} query={filterInput} />
      )}

      {!loading && !error && filteredPokemon.length > 0 && (
        <>
          <PokemonResultCount
            first={firstResult}
            last={lastResult}
            total={totalResults}
          />
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
        onClose={closeModal}
        error={detailError}
        onRetry={retryDetail}
      />
    </div>
  );
};

export default Pokemon;
