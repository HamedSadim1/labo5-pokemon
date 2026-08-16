import { TEXT } from "@/constants";

interface PokemonResultCountProps {
  first: number;
  last: number;
  total: number;
}

/**
 * "Showing X–Y of N Pokémon" status line above the grid.
 */
const PokemonResultCount = ({ first, last, total }: PokemonResultCountProps) => {
  return (
    <p className="mb-4 text-sm text-muted-foreground" role="status">
      {TEXT.resultCount(first, last, total)}
    </p>
  );
};

export default PokemonResultCount;
