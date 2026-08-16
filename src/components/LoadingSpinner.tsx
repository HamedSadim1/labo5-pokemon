import { Loader2 } from "lucide-react";

/**
 * Simple centered loading spinner.
 */
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center py-12" role="status">
      <Loader2 className="size-8 motion-safe:animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default LoadingSpinner;
