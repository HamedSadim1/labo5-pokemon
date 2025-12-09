import React from "react";

interface SearchBarProps {
  filterInput: string;
  onFilterChange: (value: string) => void;
  limit: number;
  onLimitChange: (value: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filterInput,
  onFilterChange,
  limit,
  onLimitChange,
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300"
          value={filterInput}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex gap-2">
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white transition-all duration-300"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
