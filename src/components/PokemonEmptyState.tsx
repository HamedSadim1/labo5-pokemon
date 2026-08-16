import { HeartOff, SearchX } from "lucide-react";
import { TABS, type PokemonTab } from "../constants";
import EmptyState from "./EmptyState";

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

  let message = "No Pokémon found.";
  if (activeTab === TABS.favorites) {
    message = "No favorite Pokémon yet. Tap the heart on a card to add one.";
  } else if (trimmedQuery) {
    message = `No Pokémon found for "${trimmedQuery}".`;
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
