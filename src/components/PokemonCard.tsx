import React from "react";
import { Heart } from "lucide-react";
import { type Result } from "../Services/PokemonInterface";
import { useFavorites } from "../hooks/useFavorites";
import { getPokemonId, getPokemonSprite } from "../utils/pokemonUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PokemonCardProps {
  pokemon: Result;
  onClick: (url: string) => void;
}

/**
 * Displays a single Pokemon card with its sprite, id, name and favorite toggle.
 */
const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.name);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(pokemon.url);
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      className="group relative cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
      onClick={() => onClick(pokemon.url)}
      onKeyDown={handleKeyDown}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute right-2 top-2 z-10"
        aria-label={`Toggle favorite for ${pokemon.name}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(pokemon.name);
        }}
      >
        <Heart
          className={
            favorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
          }
        />
      </Button>

      <CardContent className="flex flex-col items-center gap-3">
        <img
          src={getPokemonSprite(pokemon.url)}
          alt={pokemon.name}
          loading="lazy"
          className="size-24 object-contain transition-transform group-hover:scale-110"
        />
        <div className="flex flex-col items-center gap-1">
          <Badge variant="secondary" className="font-mono text-xs">
            #{String(getPokemonId(pokemon.url)).padStart(3, "0")}
          </Badge>
          <h3 className="font-semibold capitalize">{pokemon.name}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
