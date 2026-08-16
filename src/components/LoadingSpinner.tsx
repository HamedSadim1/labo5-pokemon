import { Loader2 } from "lucide-react";

/**
 * Simple centered loading spinner.
 */
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingSpinner;
