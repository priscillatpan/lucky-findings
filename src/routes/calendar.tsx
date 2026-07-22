import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/lucky/Nav";
import { cn } from "@/lib/utils";
import pinkTape from "@/assets/tape_2.png.asset.json";
import leafTape from "@/assets/tape_1.png.asset.json";
import badgeCloud from "@/assets/badge_1.png.asset.json";
import badgeCherry from "@/assets/badge_2.png.asset.json";
import badgeApple from "@/assets/badge_3.png.asset.json";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Lucky Findings" },
      {
        name: "description",
        content:
          "A month at a glance — every day you snapped a finding, mapped like a stamp album across the calendar.",
      },
      { property: "og:title", content: "Calendar — Lucky Findings" },
      {
        property: "og:description",
        content:
          "A month at a glance — every day you snapped a finding, mapped like a stamp album.",
      },
    ],
  }),
  component: CalendarPage,
});

type Finding = {
  title: string;
  tint: "butter" | "lime" | "sky" | "pink";
};

// March 2026 — Sun = 0. March 1 is a Sunday.
const findings: Record<number, Finding> = {
  2: { title: "Sky-blue puddle", tint: "sky" },
  4: { title: "Mossy stone", tint: "lime" },
  7: { title: "Yellow leaf boat", tint: "butter" },
  9: { title: "Bee on clover", tint: "butter" },
  12: { title: "Dewdrop crystal", tint: "sky" },
  14: { title: "Dandelion", tint: "butter" },
  15: { title: "Cloud animal", tint: "sky" },
  18: { title: "Bee on clover", tint: "butter" },
  20: { title: "Geometric stone", tint: "sky" },
  22: { title: "Pink wildflowers", tint: "pink" },
  23: { title: "Twig heart", tint: "lime" },
  24: { title: "Today's quest", tint: "pink" },
};

const tintMap = {
  butter: "bg-butter",
  lime: "bg-lime",
  sky: "bg-sky",
  pink: "bg-pink",
};

const streaks = [
  { label: "Streak of luck", value: "6 days" },
  { label: "This month", value: "12 finds" },
  { label: "Longest ever", value: "14 days" },
];

function CalendarPage() {
  const daysInMonth = 31;
  const startDay = 0; // Sunday
  const cells: (number | null)[] = [
    ...Array.from({ length: startDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const today = 24;
  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-16 paper-grid">
        {/* Header */}
        <section className="relative">
          <div className="absolute -top-4 right-8 w-24 h-7 bg-pink/50 rotate-3 mix-blend-multiply rounded-sm" />
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/50 mb-3">
              A month of small findings
            </p>
            <h1 className="font-display text-5xl md:text-6xl">March 2026</h1>
            <p className="text-forest/60 mt-3 max-w-md mx-auto text-sm">
              Every stamp is a day you noticed something. The empty squares are
              just waiting.
            </p>
          </div>
        </section>

        {/* Streaks strip */}
        <section className="grid grid-cols-3 gap-3 md:gap-4">
          {streaks.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "rounded-2xl p-4 md:p-5 ring-1 ring-forest/10 relative overflow-hidden",
                i === 0
                  ? "bg-forest text-paper"
                  : i === 1
                    ? "bg-butter"
                    : "bg-white",
              )}
            >
              <p
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest",
                  i === 0 ? "text-lime" : "text-forest/50",
                )}
              >
                {s.label}
              </p>
              <p className="font-display text-2xl md:text-3xl mt-1">
                {s.value}
              </p>
            </div>
          ))}
        </section>

        {/* Calendar grid */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(13,61,20,0.22)] ring-1 ring-forest/5">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {weekdayLabels.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-semibold uppercase tracking-widest text-forest/40 py-2"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {cells.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className="aspect-square" />;
              }
              const finding = findings[day];
              const isToday = day === today;
              const isFuture = day > today;

              const rot =
                day % 3 === 0 ? "-rotate-[3deg]" : day % 3 === 1 ? "rotate-[2deg]" : "rotate-[-1deg]";
              return (
                <div
                  key={idx}
                  className={cn(
                    "aspect-square relative flex items-center justify-center transition-transform hover:rotate-0 hover:scale-110",
                    isFuture && !finding && "opacity-40",
                  )}
                  title={finding?.title}
                >
                  {finding ? (
                    <div
                      className={cn(
                        "absolute inset-0.5 bg-white p-1 pb-2.5 shadow-[0_5px_12px_-5px_rgba(13,61,20,0.4)] ring-1 ring-forest/10 flex flex-col",
                        rot,
                        isToday && "ring-2 ring-forest",
                      )}
                    >
                      <div className={cn("flex-1 grid place-items-center", tintMap[finding.tint])}>
                        <span className="text-[8px] font-semibold uppercase tracking-widest text-forest/40">
                          photo
                        </span>
                      </div>
                      <span className="absolute bottom-0.5 right-1 text-[8px] font-semibold text-forest/60">
                        {day}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0.5 rounded-xl border border-dashed border-forest/15 bg-paper/40 p-1.5 flex flex-col justify-between",
                        isToday && "ring-2 ring-forest ring-offset-2 ring-offset-white border-solid",
                      )}
                    >
                      <span className="text-[10px] font-semibold text-forest/30">{day}</span>
                      {isToday && (
                        <div className="flex justify-end">
                          <div className="size-6 rounded-full border-2 border-dashed border-forest/40" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-5 border-t border-forest/10 flex flex-wrap gap-4 text-[11px] text-forest/60">
            <LegendDot color="lime" label="Plants" />
            <LegendDot color="sky" label="Sky & water" />
            <LegendDot color="butter" label="Creatures" />
            <LegendDot color="pink" label="Colors & wonders" />
          </div>
        </section>

        {/* Recent list under calendar */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-forest/15" />
            <h2 className="font-display text-2xl">Recent finds</h2>
            <div className="h-px flex-1 bg-forest/15" />
          </div>
          <ul className="space-y-2">
            {Object.entries(findings)
              .reverse()
              .slice(0, 5)
              .map(([day, f]) => (
                <li
                  key={day}
                  className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 ring-1 ring-forest/5"
                >
                  <div
                    className={cn(
                      "shrink-0 bg-white p-1 pb-3 shadow-[0_6px_14px_-6px_rgba(13,61,20,0.35)] ring-1 ring-forest/10 -rotate-3",
                    )}
                  >
                    <div className={cn("size-10 grid place-items-center", tintMap[f.tint])}>
                      <span className="text-[7px] font-semibold uppercase tracking-widest text-forest/40">
                        photo
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg leading-tight truncate">
                      {f.title}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-forest/40">
                      March {day}, 2026
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-forest/40">
                    View
                  </span>
                </li>
              ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: keyof typeof tintMap;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("size-3 rounded-full ring-1 ring-black/10", tintMap[color])} />
      <span>{label}</span>
    </div>
  );
}
