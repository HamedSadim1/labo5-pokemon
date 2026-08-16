import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { type Result } from "../Services/PokemonInterface";
import { useFavorites } from "../hooks/useFavorites";
import { getPokemonId, getPokemonSprite } from "../utils/pokemonUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PokemonCardProps {
  pokemon: Result;
  onClick: (url: string) => void;
}

/**
 * Displays a single Pokemon card with its sprite, id, name and favorite toggle.
 */
const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);
  const favorite = isFavorite(pokemon.name);
  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const handleFavoriteToggle = () => {
    toggleFavorite(pokemon.name);
    if (favorite) {
      toast.info(`${displayName} removed from favorites`);
    } else {
      toast.success(`${displayName} added to favorites`);
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => onClick(pokemon.url)}
        className="flex w-full flex-col items-center gap-3 rounded-xl border bg-card p-6 text-card-foreground shadow-sm motion-safe:transition-all hover:shadow-md motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {imageError ? (
          <div className="flex size-24 items-center justify-center rounded-lg bg-muted">
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        ) : (
          <img
            src={getPokemonSprite(pokemon.url)}
            alt={pokemon.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="size-24 object-contain motion-safe:transition-transform motion-safe:group-hover:scale-110"
          />
        )}
        <span className="flex flex-col items-center gap-1">
          <Badge variant="secondary" className="font-mono text-xs">
            #{String(getPokemonId(pokemon.url)).padStart(3, "0")}
          </Badge>
          <span className="font-semibold capitalize">{pokemon.name}</span>
        </span>
      </button>

      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute right-2 top-2"
        aria-label={`Toggle favorite for ${pokemon.name}`}
        onClick={handleFavoriteToggle}
      >
        <Heart
          className={
            favorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
          }
          aria-hidden="true"
        />
      </Button>
    </div>
  );
};

export default PokemonCard;
