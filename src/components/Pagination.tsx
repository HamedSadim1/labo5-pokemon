import { Button } from "@/components/ui/button";
import { MAX_VISIBLE_PAGES } from "../constants";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Returns a windowed list of page numbers (with ellipsis) for the pagination bar.
 */
const getVisiblePages = (
  page: number,
  totalPages: number
): (number | "ellipsis")[] => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  const pages: (number | "ellipsis")[] = [1];

  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages - 1) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
};

/**
 * Previous / next controls with a windowed page-number list.
 */
const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>

      {getVisiblePages(page, totalPages).map((p, index) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-muted-foreground"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon-sm"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
