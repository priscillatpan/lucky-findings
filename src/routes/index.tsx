import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/lucky/Nav";
import cloverTape from "@/assets/tape_3.png.asset.json";
import cloverBg from "@/assets/background.png.asset.json";

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

function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink paper-grid relative overflow-hidden">
      <img
        src={cloverBg.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 w-72 opacity-30 rotate-12 select-none"
      />
      <Nav />

      <main className="flex-1 flex items-center justify-center px-6 py-8 relative">
        <section id="today" className="w-full max-w-sm">
          {/* Category label — sits above the card */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-forest/60">
              <span className="size-1.5 rounded-full bg-forest/50" />
              Notice · Day 06
            </span>
          </div>

          <div className="relative">
            {/* Hand-drawn clover tape */}
            <img
              src={cloverTape.url}
              alt=""
              aria-hidden
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 -rotate-3 z-10 pointer-events-none select-none drop-shadow-sm"
            />

            <article className="bg-sky rounded-2xl p-7 pt-9 shadow-[0_14px_36px_-18px_rgba(13,61,20,0.35)] ring-1 ring-forest/15">
              <header className="mb-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/70 mb-3">
                  Today's Quest · March 24
                </p>
                <h1 className="font-display text-3xl leading-tight text-balance text-ink">
                  Find a shape in the clouds.
                </h1>
                <p className="text-sm text-ink/70 mt-3 max-w-[24ch] mx-auto">
                  Look up for one full minute. Whatever you see first — snap it.
                </p>
              </header>

              <button
                type="button"
                className="w-full bg-forest text-paper py-3.5 rounded-xl font-display text-lg shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)] hover:bg-forest/90 active:scale-[0.98] transition-all"
              >
                Take a photo of it
              </button>
              <button
                type="button"
                className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-ink/60 hover:text-ink transition-colors"
              >
                Skip for today
              </button>
            </article>
          </div>

          <p className="text-center mt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-forest/50">
            streak of luck · 6
          </p>
        </section>
      </main>
    </div>
  );
}
