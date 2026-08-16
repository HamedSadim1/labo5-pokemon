import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Previous / next page controls with a page indicator.
 */
const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="outline" onClick={onPrev} disabled={page <= 1}>
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
