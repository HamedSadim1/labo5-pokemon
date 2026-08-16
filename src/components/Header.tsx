import { Heart, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../hooks/useFavorites";
import { TABS, type PokemonTab } from "../constants";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  activeTab: PokemonTab;
  onTabChange: (tab: PokemonTab) => void;
}

/**
 * Header component with tab navigation (All / Favorites) and a dark mode toggle.
 */
const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites } = useFavorites();

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as PokemonTab)}
      >
        <TabsList>
          <TabsTrigger value={TABS.all}>All Pokémon</TabsTrigger>
          <TabsTrigger value={TABS.favorites}>
            <Heart className="size-4" aria-hidden="true" />
            Favorites ({favorites.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </Button>
    </div>
  );
};

export default Header;
