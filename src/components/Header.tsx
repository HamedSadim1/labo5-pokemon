import React from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../hooks/useFavorites";

interface HeaderProps {
  activeTab: "all" | "favorites";
  onTabChange: (tab: "all" | "favorites") => void;
}

/**
 * Header component that displays tab buttons for All Pokemon and Favorites,
 * along with a dark mode toggle button.
 */
const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites } = useFavorites();

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex gap-4">
        <button
          onClick={() => onTabChange("all")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-md border ${
            activeTab === "all"
              ? "bg-white/20 text-white border-white/30 shadow-lg"
              : "bg-white/10 text-white/80 border-white/20 hover:bg-white/15 hover:text-white"
          }`}
        >
          All Pokémon
        </button>
        <button
          onClick={() => onTabChange("favorites")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-md border ${
            activeTab === "favorites"
              ? "bg-white/20 text-white border-white/30 shadow-lg"
              : "bg-white/10 text-white/80 border-white/20 hover:bg-white/15 hover:text-white"
          }`}
        >
          Favorites ({favorites.length})
        </button>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Header;
