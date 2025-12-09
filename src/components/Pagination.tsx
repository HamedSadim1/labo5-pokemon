import React from "react";
import { IPokemon } from "../Services/PokemonInterface";

interface PaginationProps {
  pokemonData: IPokemon | null;
  offset: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pokemonData,
  offset,
  limit,
  onPrev,
  onNext,
}) => {
  if (!pokemonData) return null;

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={onPrev}
        disabled={!pokemonData.previous}
        className="px-6 py-3 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/15 disabled:bg-white/5 disabled:text-white/50 disabled:border-white/10 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
      >
        Previous
      </button>
      <span className="text-white/80 font-medium">
        Page {Math.floor(offset / limit) + 1}
      </span>
      <button
        onClick={onNext}
        disabled={!pokemonData.next}
        className="px-6 py-3 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/15 disabled:bg-white/5 disabled:text-white/50 disabled:border-white/10 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
