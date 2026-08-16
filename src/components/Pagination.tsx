import { type IPokemon } from "../Services/PokemonInterface";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  pokemonData: IPokemon | null;
  offset: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Previous / next page controls.
 */
const Pagination = ({
  pokemonData,
  offset,
  limit,
  onPrev,
  onNext,
}: PaginationProps) => {
  if (!pokemonData) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={!pokemonData.previous}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {Math.floor(offset / limit) + 1}
      </span>
      <Button variant="outline" onClick={onNext} disabled={!pokemonData.next}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
