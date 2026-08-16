import React from "react";
import { type Result } from "@/Services/PokemonInterface";
import { POKEMON_GRID_CLASS } from "@/constants";
import { cn } from "@/lib/utils";
import PokemonCard from "@/components/pokemon/PokemonCard";

interface PokemonGridProps {
  pokemon: Result[];
  onPokemonClick: (url: string) => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemon,
  onPokemonClick,
}) => {
  return (
    <div className={cn(POKEMON_GRID_CLASS, "mb-8")}>
      {pokemon.map((p) => (
        <PokemonCard key={p.name} pokemon={p} onClick={onPokemonClick} />
      ))}
    </div>
  );
};

export default PokemonGrid;
