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
      Showing {first}–{last} of {total} Pokémon
    </p>
  );
};

export default PokemonResultCount;
