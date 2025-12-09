import React from "react";
import { PokemonDetail } from "../Services/PokemonInterface";
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
}

const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="capitalize text-white">
            {pokemon?.name}
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Pokémon Details
          </DialogDescription>
        </DialogHeader>

        {/* Custom Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {pokemon && (
          <div className="grid gap-4 py-4">
            {/* Pokemon Image */}
            <div className="flex justify-center">
              <img
                src={
                  pokemon.sprites.other["official-artwork"]?.front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Types */}
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                Types
              </label>
              <div className="flex gap-2">
                {pokemon.types.map(
                  (typeInfo: { type: { name: string } }, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md bg-white/20 border border-white/30"
                    >
                      {typeInfo.type.name}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                Stats
              </label>
              <div className="grid gap-2">
                {pokemon.stats.map(
                  (
                    stat: { base_stat: number; stat: { name: string } },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 items-center gap-4"
                    >
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize text-white">
                        {stat.stat.name.replace("-", " ")}
                      </label>
                      <div className="col-span-2 h-2 backdrop-blur-md bg-white/20 rounded-full border border-white/30">
                        <div
                          className="h-2 bg-linear-to-r from-yellow-400 to-pink-500 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              (stat.base_stat / 255) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Height and Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                  Height
                </label>
                <div className="text-sm text-white">
                  {pokemon.height / 10} m
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                  Weight
                </label>
                <div className="text-sm text-white">
                  {pokemon.weight / 10} kg
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
