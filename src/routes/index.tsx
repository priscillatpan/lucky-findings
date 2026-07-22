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
          <div className="absolute -top-6 -left-4 w-28 h-8 bg-sky/40 -rotate-6 z-10 mix-blend-multiply rounded-sm" />
          <div className="absolute -top-4 right-10 w-20 h-7 bg-pink/50 rotate-3 z-10 mix-blend-multiply rounded-sm" />

          <article className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_20px_60px_-25px_rgba(13,61,20,0.22)] ring-1 ring-forest/5 relative overflow-hidden">
            <header className="mb-10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/50 mb-3">
                Daily Quest · March 24
              </p>
              <h1 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                Find a petal the color of a summer sunset.
              </h1>
              <p className="text-sm text-forest/60 mt-4 max-w-md mx-auto">
                Somewhere between orange, pink, and gold. It doesn't have to be
                perfect — trust the first one that catches your eye.
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col items-center gap-4">
                <BadgeSlot size="lg" locked label="Today's badge" />
                <p className="text-xs text-center text-forest/50 max-w-[200px]">
                  A stamp will appear here once you snap your finding.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full aspect-square bg-lime/15 rounded-xl outline-2 outline-dashed -outline-offset-4 outline-forest/20 flex flex-col items-center justify-center gap-3 group hover:bg-lime/25 transition-colors"
                >
                  <div className="size-14 rounded-full bg-white ring-1 ring-forest/10 grid place-items-center group-hover:scale-110 transition-transform">
                    <div className="size-4 bg-forest rounded-full" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-forest/70">
                    Open camera
                  </span>
                </button>
                <button
                  type="button"
                  className="w-full bg-forest text-paper py-4 rounded-xl font-display text-xl shadow-[0_10px_25px_-10px_rgba(13,102,34,0.55)] hover:bg-forest/90 active:scale-[0.98] transition-all"
                >
                  Submit finding
                </button>
              </div>
            </div>
          </article>
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

        {/* Badge Collection */}
        <section id="badges" className="bg-lime/15 rounded-3xl p-8 md:p-10 ring-1 ring-forest/10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl">Collection</h2>
              <p className="text-sm text-forest/60">
                12 stamps earned this spring
              </p>
            </div>
            <div className="text-right text-[11px] font-semibold uppercase tracking-widest text-forest/50">
              3 of 12
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
