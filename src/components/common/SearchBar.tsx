import { Search, X } from "lucide-react";
import { PAGE_SIZE_OPTIONS, TEXT } from "@/constants";
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
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="text"
          placeholder={TEXT.searchPlaceholder}
          aria-label={TEXT.searchLabel}
          className="pl-9 pr-9"
          value={filterInput}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        {filterInput && (
          <button
            type="button"
            onClick={() => onFilterChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={TEXT.clearSearch}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <Select
        value={String(limit)}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-full sm:w-45" aria-label={TEXT.itemsPerPage}>
          <SelectValue placeholder={TEXT.itemsPerPage} />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size} {TEXT.itemsPerPageSuffix}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
