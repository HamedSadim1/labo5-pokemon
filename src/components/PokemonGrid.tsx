import React from "react";
import { Result } from "../Services/PokemonInterface";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemon: Result[];
  onPokemonClick: (url: string) => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemon,
  onPokemonClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {pokemon.map((p) => (
        <PokemonCard key={p.name} pokemon={p} onClick={onPokemonClick} />
      ))}
    </div>
  );
};

export default PokemonGrid;
