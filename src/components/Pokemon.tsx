import React, { useState, useEffect } from "react";
import { IPokemon, Result, PokemonDetail } from "../Services/PokemonInterface";
import axios from "axios";
import Header from "./Header";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";
import PokemonModal from "./PokemonModal";
import { useFavorites } from "../hooks/useFavorites";

/**
 * Main Pokemon component that handles fetching, filtering, and displaying Pokemon data.
 * It manages state for Pokemon list, loading, search, pagination, and modal display.
 */
const Pokemon: React.FC = () => {
  // State for storing the fetched Pokemon data from the API
  const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);
  // State for indicating if data is being loaded
  const [loading, setLoading] = useState<boolean>(false);
  // State for the search filter input
  const [filterInput, setFilterInput] = useState<string>("");
  // State for the number of Pokemon to fetch per page
  const [limit, setLimit] = useState<number>(20);
  // State for the offset in the API pagination
  const [offset, setOffset] = useState<number>(0);
  // State for the selected Pokemon details for the modal
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  // State for controlling the modal open/close
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // State for the active tab (all or favorites)
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  // Hook for managing favorites
  const { favorites, isFavorite } = useFavorites();

  // Effect to fetch Pokemon data when limit or offset changes
  useEffect(() => {
    fetchPokemon();
  }, [limit, offset]);

  /**
   * Fetches a list of Pokemon from the PokeAPI based on current limit and offset.
   */
  const fetchPokemon = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<IPokemon>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
    setLoading(false);
  };

  /**
   * Fetches detailed information for a specific Pokemon and opens the modal.
   * @param url - The API URL for the Pokemon details.
   */
  const fetchPokemonDetail = async (url: string): Promise<void> => {
    try {
      const response = await axios.get<PokemonDetail>(url);
      setSelectedPokemon(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
    }
  };

  // Filtered list of Pokemon based on search input and active tab
  const filteredPokemon: Result[] =
    pokemonData?.results.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(filterInput.toLowerCase());
      const matchesTab =
        activeTab === "favorites" ? isFavorite(pokemon.name) : true;
      return matchesSearch && matchesTab;
    }) || [];

  /**
   * Handles pagination to the next page if available.
   */
  const handleNext = (): void => {
    if (pokemonData?.next) {
      setOffset(offset + limit);
    }
  };

  /**
   * Handles pagination to the previous page if available.
   */
  const handlePrev = (): void => {
    if (pokemonData?.previous && offset > 0) {
      setOffset(offset - limit);
    }
  };

  // Render the Pokemon component with header, search, grid, pagination, and modal
  return (
    <div className="max-w-6xl mx-auto">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <SearchBar
        filterInput={filterInput}
        onFilterChange={setFilterInput}
        limit={limit}
        onLimitChange={setLimit}
      />

      {loading && <LoadingSpinner />}

      {!loading && (
        <PokemonGrid
          pokemon={filteredPokemon}
          onPokemonClick={fetchPokemonDetail}
        />
      )}

      {!loading && (
        <Pagination
          pokemonData={pokemonData}
          offset={offset}
          limit={limit}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Pokemon;
