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

const Pokemon: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterInput, setFilterInput] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const { favorites, isFavorite } = useFavorites();

  useEffect(() => {
    fetchPokemon();
  }, [limit, offset]);

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

  const fetchPokemonDetail = async (url: string): Promise<void> => {
    try {
      const response = await axios.get<PokemonDetail>(url);
      setSelectedPokemon(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
    }
  };

  const filteredPokemon: Result[] =
    pokemonData?.results.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(filterInput.toLowerCase());
      const matchesTab =
        activeTab === "favorites" ? isFavorite(pokemon.name) : true;
      return matchesSearch && matchesTab;
    }) || [];

  const handleNext = (): void => {
    if (pokemonData?.next) {
      setOffset(offset + limit);
    }
  };

  const handlePrev = (): void => {
    if (pokemonData?.previous && offset > 0) {
      setOffset(offset - limit);
    }
  };

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
