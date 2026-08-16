import { type PokemonDetail } from "../Services/PokemonInterface";
import { getTypeColor } from "../utils/pokemonUtils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  onRetry: () => void;
}

/**
 * Modal dialog with detailed Pokemon information, plus loading and error states.
 */
const PokemonModal = ({
  pokemon,
  isOpen,
  onClose,
  error,
  onRetry,
}: PokemonModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {pokemon?.name ?? "Loading…"}
          </DialogTitle>
          <DialogDescription>Pokémon details</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" onClick={onRetry}>
              <RefreshCw />
              Try again
            </Button>
          </div>
        )}

        {!error && !pokemon && (
          <div className="flex justify-center py-10">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}

        {!error && pokemon && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                #{String(pokemon.id).padStart(3, "0")}
              </Badge>
              <img
                src={
                  pokemon.sprites.other["official-artwork"]?.front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="size-36 object-contain"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {pokemon.types.map((typeInfo) => (
                <Badge
                  key={typeInfo.type.name}
                  className={`capitalize ${getTypeColor(typeInfo.type.name)}`}
                >
                  {typeInfo.type.name}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground">Height</div>
                <div className="font-semibold">{pokemon.height / 10} m</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground">Weight</div>
                <div className="font-semibold">{pokemon.weight / 10} kg</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Abilities</h4>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((abilityInfo) => (
                  <Badge
                    key={abilityInfo.ability.name}
                    variant="outline"
                    className="capitalize"
                  >
                    {abilityInfo.ability.name.replace("-", " ")}
                    {abilityInfo.is_hidden && (
                      <span className="text-muted-foreground">(hidden)</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Stats</h4>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-sm capitalize text-muted-foreground">
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <Progress
                    value={Math.min((stat.base_stat / 255) * 100, 100)}
                    className="flex-1"
                  />
                  <span className="w-8 text-right text-sm font-medium">
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
