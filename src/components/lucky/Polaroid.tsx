import { cn } from "@/lib/utils";

type PolaroidProps = {
  title: string;
  date: string;
  caption?: string;
  rotate?: string;
  tint?: "butter" | "lime" | "sky" | "pink";
  tape?: "lime" | "pink" | "sky" | "butter";
};

const tintMap = {
  butter: "bg-butter/20",
  lime: "bg-lime/25",
  sky: "bg-sky/20",
  pink: "bg-pink/25",
};

const tapeMap = {
  lime: "bg-lime/60",
  pink: "bg-pink/50",
  sky: "bg-sky/50",
  butter: "bg-butter/70",
};

export function Polaroid({
  title,
  date,
  caption,
  rotate = "rotate-1",
  tint = "lime",
  tape = "lime",
}: PolaroidProps) {
  return (
    <figure className={cn("relative w-full max-w-[280px]", rotate)}>
      <div
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 mix-blend-multiply -rotate-3 rounded-[1px]",
          tapeMap[tape],
        )}
      />
      <div className="p-3 pb-10 bg-white shadow-[0_18px_40px_-18px_rgba(13,61,20,0.28)] ring-1 ring-forest/5">
        <div
          className={cn(
            "w-full aspect-square grid place-items-center",
            tintMap[tint],
          )}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-forest/35">
            photo
          </span>
        </div>
        <figcaption className="mt-4 px-1">
          <p className="font-display text-lg leading-tight text-ink">{title}</p>
          <p className="text-[10px] uppercase tracking-widest text-forest/40 mt-1">
            {date}
          </p>
          {caption && (
            <p className="text-xs text-forest/70 italic mt-2 leading-snug">
              "{caption}"
            </p>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
