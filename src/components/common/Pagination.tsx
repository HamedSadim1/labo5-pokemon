import { Button } from "@/components/ui/button";
import { TEXT } from "@/constants";
import { ELLIPSIS, getVisiblePages } from "@/utils/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

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
        {TEXT.paginationPrevious}
      </Button>

      {getVisiblePages(page, totalPages).map((p, index) =>
        p === ELLIPSIS ? (
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
            aria-label={TEXT.pageLabel(p)}
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
        {TEXT.paginationNext}
      </Button>
    </div>
  );
};

export default Pagination;
