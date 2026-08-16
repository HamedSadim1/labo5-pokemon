import { POKEMON_GRID_CLASS, SKELETON_COUNT } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton placeholder grid shown while the Pokémon list is loading.
 */
const PokemonSkeleton = () => {
  return (
    <div className={POKEMON_GRID_CLASS}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-6">
          <Skeleton className="mx-auto size-24 rounded-full" />
          <Skeleton className="mx-auto mt-3 h-4 w-16" />
          <Skeleton className="mx-auto mt-2 h-4 w-24" />
        </div>
      ))}
    </div>
  );
};

export default PokemonSkeleton;
