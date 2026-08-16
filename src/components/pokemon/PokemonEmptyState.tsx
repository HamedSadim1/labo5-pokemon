import { HeartOff, SearchX } from "lucide-react";
import { TABS, TEXT, type PokemonTab } from "@/constants";
import EmptyState from "@/components/common/EmptyState";

interface PokemonEmptyStateProps {
  activeTab: PokemonTab;
  query: string;
}

/**
 * Empty state for the grid, with a message and icon that adapt to the active
 * tab (favorites vs search).
 */
const PokemonEmptyState = ({ activeTab, query }: PokemonEmptyStateProps) => {
  const trimmedQuery = query.trim();

  let message = TEXT.emptyNoPokemon;
  if (activeTab === TABS.favorites) {
    message = TEXT.emptyNoFavorites;
  } else if (trimmedQuery) {
    message = TEXT.emptyNoSearchResults(trimmedQuery);
  }

  return (
    <EmptyState
      icon={
        activeTab === TABS.favorites ? (
          <HeartOff className="size-8 text-muted-foreground" aria-hidden="true" />
        ) : (
          <SearchX className="size-8 text-muted-foreground" aria-hidden="true" />
        )
      }
      message={message}
    />
  );
};

export default PokemonEmptyState;
