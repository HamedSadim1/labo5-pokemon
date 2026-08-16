import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  compact?: boolean;
}

/**
 * Reusable error placeholder with a retry action. `compact` drops the border
 * and background so it can sit inside a modal or other container.
 */
const ErrorState = ({
  message,
  onRetry,
  compact = false,
}: ErrorStateProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 text-center ${
        compact
          ? "py-6"
          : "rounded-xl border border-destructive/30 bg-destructive/5 p-10"
      }`}
    >
      <p className="text-sm text-destructive">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        <RefreshCw aria-hidden="true" />
        Try again
      </Button>
    </div>
  );
};

export default ErrorState;
