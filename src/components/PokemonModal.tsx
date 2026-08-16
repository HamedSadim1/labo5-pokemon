import { type PokemonDetail } from "../Services/PokemonInterface";
import { formatDexNumber, formatPokemonName, getTypeColor } from "../utils/pokemonUtils";
import { DECIMETERS_PER_METER, MAX_BASE_STAT } from "../constants";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorState from "./ErrorState";
import SpritePlaceholder from "./SpritePlaceholder";

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
  const spriteUrl = pokemon
    ? (pokemon.sprites.other["official-artwork"]?.front_default ??
      pokemon.sprites.front_default)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {pokemon ? formatPokemonName(pokemon.name) : "Loading…"}
          </DialogTitle>
          <DialogDescription>Pokémon details</DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(90dvh-10rem)] overflow-y-auto pr-1" tabIndex={0}>
          {error && <ErrorState message={error} onRetry={onRetry} compact />}

          {!error && !pokemon && (
            <div className="flex justify-center py-10" role="status">
              <Loader2 className="size-8 motion-safe:animate-spin text-primary" aria-hidden="true" />
              <span className="sr-only">Loading…</span>
            </div>
          )}

          {!error && pokemon && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {formatDexNumber(pokemon.id)}
                </Badge>
                {spriteUrl ? (
                  <img
                    src={spriteUrl}
                    alt={formatPokemonName(pokemon.name)}
                    className="size-36 object-contain"
                  />
                ) : (
                  <SpritePlaceholder size="lg" />
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {(pokemon.types ?? []).map((typeInfo) => (
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
                  <div className="font-semibold">{pokemon.height / DECIMETERS_PER_METER} m</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-semibold">{pokemon.weight / DECIMETERS_PER_METER} kg</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {(pokemon.abilities ?? []).map((abilityInfo) => (
                    <Badge
                      key={abilityInfo.ability.name}
                      variant="outline"
                    >
                      {formatPokemonName(abilityInfo.ability.name)}
                      {abilityInfo.is_hidden && (
                        <span className="text-muted-foreground">(hidden)</span>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Stats</h3>
                {(pokemon.stats ?? []).map((stat) => (
                  <div key={stat.stat.name} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-sm text-muted-foreground">
                      {formatPokemonName(stat.stat.name)}
                    </span>
                    <Progress
                      value={Math.min((stat.base_stat / MAX_BASE_STAT) * 100, 100)}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
