import { TEXT } from "@/constants";
import { cn } from "@/lib/utils";

interface SpritePlaceholderProps {
  size?: "sm" | "lg";
}

/**
 * Muted "No image" placeholder shown when a Pokémon sprite is missing or fails
 * to load. Replaces the browser's broken-image icon.
 */
const SpritePlaceholder = ({ size = "sm" }: SpritePlaceholderProps) => {
  const isLarge = size === "lg";
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-muted",
        isLarge ? "size-36" : "size-24"
      )}
    >
      <span
        className={cn("text-muted-foreground", isLarge ? "text-sm" : "text-xs")}
      >
        {TEXT.noImage}
      </span>
    </div>
  );
};

export default SpritePlaceholder;
