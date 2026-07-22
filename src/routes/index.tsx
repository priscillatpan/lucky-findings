import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/lucky/Nav";
import { Polaroid } from "@/components/lucky/Polaroid";
import { BadgeSlot } from "@/components/lucky/BadgeSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today's Quest — Lucky Findings" },
      {
        name: "description",
        content:
          "Your daily nature quest — one tiny prompt, one snapped photo, a growing field journal of small lucky findings.",
      },
      { property: "og:title", content: "Today's Quest — Lucky Findings" },
      {
        property: "og:description",
        content:
          "A daily nature quest journal. One tiny prompt, one snapped photo, a growing collection of lucky findings.",
      },
    ],
  }),
  component: Home,
});

const journalEntries = [
  {
    n: "01",
    title: "Pink wildflowers",
    date: "Mar 22, 2026",
    caption:
      "Found these tiny clusters near the old oak bridge. They smell slightly like honey and rain.",
    tint: "pink" as const,
    tape: "lime" as const,
    rotate: "rotate-2",
    align: "left" as const,
  },
  {
    n: "02",
    title: "Geometric stone",
    date: "Mar 20, 2026",
    caption:
      "A rock shaped like a perfect triangle. Kept it in my pocket for three miles for luck.",
    tint: "sky" as const,
    tape: "pink" as const,
    rotate: "-rotate-3",
    align: "right" as const,
  },
  {
    n: "03",
    title: "Bee on clover",
    date: "Mar 18, 2026",
    caption:
      "She let me get so close. Wings the color of old cellophane. Stayed for maybe two seconds.",
    tint: "butter" as const,
    tape: "sky" as const,
    rotate: "rotate-1",
    align: "left" as const,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-32 paper-grid">
        {/* Today's Quest */}
        <section id="today" className="relative">
          {/* Category label — sits above the card */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-forest/60">
              <span className="size-1.5 rounded-full bg-forest/50" />
              Notice · Day 06
            </span>
          </div>

          <div className="relative">
            {/* Clover-tape placeholder */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 -rotate-2 z-10 rounded-sm border-2 border-dashed border-forest/25 bg-lime/60 grid place-items-center text-[8px] font-semibold uppercase tracking-widest text-forest/50">
              clover tape
            </div>

            <article className="bg-sky/25 rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-18px_rgba(13,61,20,0.25)] ring-1 ring-forest/10">
              <header className="mb-5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/60 mb-3">
                  March 24
                </p>
                <h1 className="font-display text-3xl md:text-4xl leading-tight text-balance">
                  Find a shape in the clouds.
                </h1>
                <p className="text-sm text-forest/70 mt-3 max-w-xs mx-auto">
                  Look up for one full minute. Whatever you see first — snap it.
                </p>
              </header>

              <button
                type="button"
                className="w-full bg-forest text-paper py-3.5 rounded-xl font-display text-lg shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)] hover:bg-forest/90 active:scale-[0.98] transition-all"
              >
                Open camera
              </button>
            </article>
          </div>
        </section>

        {/* Field Journal */}
        <section id="journal" className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-forest/15" />
            <h2 className="font-display text-3xl">Field Journal</h2>
            <div className="h-px flex-1 bg-forest/15" />
          </div>

          <div className="space-y-24">
            {journalEntries.map((entry) => (
              <div
                key={entry.n}
                className={`relative flex flex-col ${entry.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-start group`}
              >
                <div
                  className={`absolute ${entry.align === "right" ? "-right-2 md:-right-6" : "-left-2 md:-left-6"} -top-2 font-display text-6xl text-forest/15 group-hover:text-forest/30 transition-colors`}
                >
                  {entry.n}
                </div>
                <div className="shrink-0 transition-transform duration-500 group-hover:rotate-0">
                  <Polaroid
                    title={entry.title}
                    date={entry.date}
                    tint={entry.tint}
                    tape={entry.tape}
                    rotate={entry.rotate}
                  />
                </div>
                <div
                  className={`flex-1 pt-6 ${entry.align === "right" ? "md:text-right" : ""}`}
                >
                  <p className="text-forest/75 leading-relaxed max-w-[40ch] italic text-lg">
                    "{entry.caption}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lucky Finds Collection */}
        <section id="badges" className="bg-lime/15 rounded-3xl p-8 md:p-10 ring-1 ring-forest/10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl">Lucky Finds</h2>
              <p className="text-sm text-forest/60">
                3 of 12 found this spring
              </p>
            </div>
            <div className="text-right text-[11px] font-semibold uppercase tracking-widest text-forest/50">
              streak of luck · 6
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            <BadgeSlot label="Pebble finder" color="butter" rotate="-rotate-3" />
            <BadgeSlot label="Cloud watcher" color="sky" rotate="rotate-6" />
            <BadgeSlot label="First bloom" color="pink" rotate="-rotate-6" />
            {Array.from({ length: 9 }).map((_, i) => (
              <BadgeSlot key={i} locked />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
