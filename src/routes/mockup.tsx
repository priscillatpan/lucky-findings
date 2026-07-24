import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import cloverTape from "@/assets/tape_3_v2.png.asset.json";
import cloverIcon from "@/assets/icon_2.png.asset.json";
import { QUESTS } from "@/data/quests";

export const Route = createFileRoute("/mockup")({
  head: () => ({
    meta: [
      { title: "Lucky Findings — All Quests Demo" },
      { name: "description", content: "A demo of all 30 Lucky Findings quest prompts cycling through." },
      { property: "og:title", content: "Lucky Findings — All Quests Demo" },
      { property: "og:description", content: "A demo of all 30 Lucky Findings quest prompts cycling through." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FlashDemo,
});

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}

function categoryDotClass(cat: string) {
  switch (cat) {
    case "Search": return "bg-lime";
    case "Notice": return "bg-sky";
    case "Serendipity": return "bg-pink";
    case "Encounter": return "bg-butter";
    case "Make": return "bg-forest";
    default: return "bg-forest";
  }
}

function categoryBorderClass(cat: string) {
  switch (cat) {
    case "Search": return "border-l-lime";
    case "Notice": return "border-l-sky";
    case "Serendipity": return "border-l-pink";
    case "Encounter": return "border-l-butter";
    case "Make": return "border-l-forest";
    default: return "border-l-forest";
  }
}

function FlashDemo() {
  const today = new Date();
  const [cycleIdx, setCycleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycleIdx((i) => i + 1), 500);
    return () => clearInterval(id);
  }, []);

  const quest = QUESTS[cycleIdx % QUESTS.length];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink paper-grid relative overflow-hidden">
      <header className="relative z-10 pt-5 px-5 flex items-center justify-center gap-1.5">
        <img src={cloverIcon.url} alt="" aria-hidden className="size-4 -rotate-6 object-contain opacity-90" />
        <span className="font-display text-sm tracking-tight text-forest/80">Lucky Findings</span>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-5 pt-2 pb-24 relative">
        <section className="w-full max-w-[18rem]">
          <div className="text-center mb-1">
            <img
              src={cloverIcon.url}
              alt=""
              aria-hidden
              className="size-6 mx-auto mb-1.5 -rotate-6 object-contain opacity-90"
            />
            <h2 className="font-display text-2xl leading-none">Today's Quest</h2>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1">
              {formatDate(today)}
            </p>
          </div>

          <div className="relative mt-5">
            <img
              src={cloverTape.url}
              alt=""
              aria-hidden
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 -rotate-3 z-10 pointer-events-none select-none drop-shadow-sm saturate-[65%] brightness-105"
            />

            <article className={`bg-card rounded-2xl p-4 pt-7 min-h-[10rem] shadow-[0_14px_36px_-18px_rgba(13,61,20,0.35)] ring-1 ring-forest/20 border-2 border-forest/30 border-l-4 ${categoryBorderClass(quest.category)} relative flex flex-col justify-center`}>
              <span className="absolute top-2.5 right-3 flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.2em] text-forest/70">
                <span className={"size-2 rounded-full ring-1 ring-forest/30 " + categoryDotClass(quest.category)} />
                {quest.category}
              </span>
              <header className="text-center pt-1 pb-1 flex-1 flex flex-col justify-center">
                <h1 className="font-display text-lg leading-tight text-balance">
                  {quest.title}
                </h1>
                <p className="text-[11px] text-ink/75 mt-1.5 max-w-[24ch] mx-auto">
                  {quest.hint}
                </p>
              </header>
            </article>
          </div>

          <p className="text-center mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/50">
            Demo: cycling all 30 quests
          </p>
        </section>
      </main>
    </div>
  );
}
