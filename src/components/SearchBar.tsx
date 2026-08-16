import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  filterInput: string;
  onFilterChange: (value: string) => void;
  limit: number;
  onLimitChange: (value: number) => void;
}

/**
 * Search and pagination-size controls.
 */
const SearchBar = ({
  filterInput,
  onFilterChange,
  limit,
  onLimitChange,
}: SearchBarProps) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search Pokémon..."
          className="pl-9 pr-9"
          value={filterInput}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        {filterInput && (
          <button
            type="button"
            onClick={() => onFilterChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <Select
        value={String(limit)}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
          <SelectItem value="50">50 per page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
