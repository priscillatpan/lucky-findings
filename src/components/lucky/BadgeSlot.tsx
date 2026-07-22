import { cn } from "@/lib/utils";

type BadgeSlotProps = {
  label?: string;
  color?: "butter" | "lime" | "sky" | "pink" | "forest";
  locked?: boolean;
  rotate?: string;
  size?: "sm" | "md" | "lg";
};

const colorMap = {
  butter: "bg-butter text-ink",
  lime: "bg-lime text-ink",
  sky: "bg-sky text-paper",
  pink: "bg-pink text-paper",
  forest: "bg-forest text-paper",
};

const sizeMap = {
  sm: "size-14",
  md: "size-20",
  lg: "size-40",
};

// Empty circular slot for user's hand-drawn badge art.
// Never generate illustrations here — this is a placeholder frame only.
export function BadgeSlot({
  label,
  color = "butter",
  locked = false,
  rotate,
  size = "md",
}: BadgeSlotProps) {
  if (locked) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            sizeMap[size],
            "rounded-full border-2 border-dashed border-forest/15 flex items-center justify-center bg-paper/40",
          )}
        >
          <div className="size-2 rounded-full bg-forest/10" />
        </div>
        {label && (
          <span className="text-[9px] font-semibold uppercase tracking-widest text-forest/30">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", rotate)}>
        <div
          className={cn(
            sizeMap[size],
            colorMap[color],
            "rounded-full shadow-[0_6px_20px_-6px_rgba(13,61,20,0.35)] ring-1 ring-black/5 flex items-center justify-center",
          )}
        >
          <div className="size-1/2 rounded-full border-2 border-dashed border-current opacity-30 grid place-items-center">
            <span className="text-[8px] font-semibold uppercase tracking-widest opacity-60">
              art
            </span>
          </div>
        </div>
      </div>
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-forest/60 text-center leading-tight">
          {label}
        </span>
      )}
    </div>
  );
}
