import React from "react";
import { Result } from "../Services/PokemonInterface";
import { useFavorites } from "../hooks/useFavorites";

interface PokemonCardProps {
  pokemon: Result;
  onClick: (url: string) => void;
}

/**
 * Component that displays a single Pokemon card with name and favorite toggle.
 * Clicking the card triggers the onClick callback, and the heart icon toggles favorites.
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  /**
   * Handles the favorite toggle button click, preventing event propagation.
   */
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pokemon.name);
  };

  return (
    <div
      className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 relative hover:bg-white/15"
      onClick={() => onClick(pokemon.url)}
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg"
        aria-label={`Toggle favorite for ${pokemon.name}`}
      >
        <svg
          className={`w-5 h-5 ${
            isFavorite(pokemon.name)
              ? "text-red-400 fill-current"
              : "text-white/70"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <div className="p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 backdrop-blur-md bg-white/20 rounded-full flex items-center justify-center border border-white/30 shadow-lg">
          <span className="text-2xl font-bold text-white">
            {pokemon.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white capitalize">
          {pokemon.name}
        </h3>
      </div>
    </div>
  );
};

export default PokemonCard;
