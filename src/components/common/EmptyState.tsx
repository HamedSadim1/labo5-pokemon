import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
}

/**
 * Reusable empty-state placeholder with an icon and message.
 */
const EmptyState = ({ icon, message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border p-10 text-center">
      {icon}
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyState;
