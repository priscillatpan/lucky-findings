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

      <main className="flex-1 flex items-center justify-center px-5 py-6 relative">
        <section id="today" className="w-full max-w-[18rem]">
          {/* Big title above the card */}
          <div className="text-center mb-4">
            <h2 className="font-display text-4xl leading-none text-ink">
              Today's Quest
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1.5">
              March 24 · Notice · Day 06
            </p>
          </div>

          <div className="relative">
            {/* Hand-drawn clover tape */}
            <img
              src={cloverTape.url}
              alt=""
              aria-hidden
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-36 -rotate-3 z-10 pointer-events-none select-none drop-shadow-sm"
            />

            <article className="bg-pink rounded-2xl p-6 pt-8 shadow-[0_14px_36px_-18px_rgba(13,61,20,0.35)] ring-1 ring-forest/15">
              <header className="mb-5 text-center">
                <h1 className="font-display text-[1.65rem] leading-tight text-balance text-ink">
                  Find a shape in the clouds.
                </h1>
                <p className="text-sm text-ink/75 mt-2.5 max-w-[24ch] mx-auto">
                  Look up for one full minute. Whatever you see first — snap it.
                </p>
              </header>

              <button
                type="button"
                className="w-full bg-forest text-paper py-3 rounded-xl font-display text-lg shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)] hover:bg-forest/90 active:scale-[0.98] transition-all"
              >
                Take a photo of it
              </button>
              <button
                type="button"
                className="w-full mt-2 py-2 rounded-xl text-sm font-semibold uppercase tracking-widest text-ink/65 hover:text-ink transition-colors"
              >
                Skip for today
              </button>
            </article>
          </div>

          <p className="text-center mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-forest/50">
            streak of luck · 6
          </p>
        </section>
      </main>
    </div>
  );
}
