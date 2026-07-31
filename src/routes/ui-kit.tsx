import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { isUnlocked } from "@/lib/gate.functions";
import cloverIcon from "@/assets/icon_2.png.asset.json";
import cloverIconAlt from "@/assets/icon_1.png.asset.json";
import tape1 from "@/assets/tape_1.png.asset.json";
import tape2 from "@/assets/tape_2.png.asset.json";
import tape3 from "@/assets/tape_3.png.asset.json";
import badge1 from "@/assets/badge_1.png.asset.json";
import badge2 from "@/assets/badge_2.png.asset.json";
import badge3 from "@/assets/badge_3.png.asset.json";

export const Route = createFileRoute("/ui-kit")({
  beforeLoad: async () => {
    const { unlocked } = await isUnlocked();
    if (!unlocked) throw redirect({ to: "/unlock" });
  },
  head: () => ({
    meta: [
      { title: "UI Kit — Lucky Findings" },
      { name: "description", content: "The Lucky Findings design system — colors, type, components, and hand-drawn assets in one place." },
      { property: "og:title", content: "UI Kit — Lucky Findings" },
      { property: "og:description", content: "The Lucky Findings design system reference." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: UiKit,
});

const swatches = [
  { name: "Butter", hex: "#fbfa74", note: "Highlights / playful pops" },
  { name: "Lime", hex: "#e2f657", note: "Search category" },
  { name: "Forest", hex: "#0d6622", note: "Type, buttons, borders" },
  { name: "Sky", hex: "#50b4f8", note: "Notice category" },
  { name: "Pink", hex: "#e78dd7", note: "Serendipity / tape" },
  { name: "Paper", hex: "#fbf7ec", note: "Background" },
  { name: "Ink", hex: "#143b1c", note: "Body text" },
];

const categories = [
  { name: "Search", dot: "bg-lime" },
  { name: "Notice", dot: "bg-sky" },
  { name: "Serendipity", dot: "bg-pink" },
  { name: "Encounter", dot: "bg-butter" },
  { name: "Make", dot: "bg-forest" },
];

function UiKit() {
  return (
    <div className="min-h-screen bg-paper text-ink paper-grid">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <header className="flex items-center gap-3">
          <img src={cloverIcon.url} alt="" className="size-12" />
          <div>
            <h1 className="font-display text-4xl text-forest leading-none">Lucky Findings — UI kit</h1>
            <p className="text-forest/60 text-sm mt-1">One-page design system for the field journal.</p>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-forest">Palette</h2>
          <div className="flex flex-wrap gap-5">
            {swatches.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-1">
                <div
                  className="size-14 rounded-full ring-2 ring-white shadow-[0_4px_10px_-4px_rgba(13,61,20,0.3)]"
                  style={{ background: s.hex }}
                />
                <p className="text-xs font-semibold text-forest mt-1">{s.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-forest/50">{s.hex}</p>
                <p className="text-[9px] text-forest/60 text-center max-w-[5.5rem] leading-tight">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-5">
          <section className="bg-card rounded-2xl p-5 ring-1 ring-forest/10 space-y-4">
            <h2 className="font-display text-2xl text-forest">Typography</h2>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50">Display · Gloock</p>
              <p className="font-display text-4xl leading-none mt-1">A little luck</p>
              <p className="font-display text-2xl leading-none mt-1">once a day.</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50">Body · Inter</p>
              <p className="text-sm mt-1">Find a leaf with two colors.</p>
              <p className="text-xs text-forest/70 mt-0.5">Caption text sits in muted forest.</p>
            </div>
          </section>

          <section className="bg-card rounded-2xl p-5 ring-1 ring-forest/10 space-y-4">
            <h2 className="font-display text-2xl text-forest">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span key={c.name} className="flex items-center gap-1.5 bg-paper rounded-full px-3 py-1.5 ring-1 ring-forest/15">
                  <span className={`size-2.5 rounded-full ring-1 ring-forest/30 ${c.dot}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest/80">{c.name}</span>
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-card rounded-2xl p-5 ring-1 ring-forest/10 space-y-4">
          <h2 className="font-display text-2xl text-forest">Components</h2>
          <div className="grid md:grid-cols-2 gap-5 items-start">
            <article className="bg-card rounded-2xl p-6 pt-10 shadow-[0_14px_36px_-18px_rgba(13,61,20,0.25)] ring-1 ring-forest/20 border-2 border-forest/30 border-l-4 border-l-sky relative">
              <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-forest/70">
                <span className="size-2.5 rounded-full ring-1 ring-forest/30 bg-sky" />
                Notice
              </span>
              <h3 className="font-display text-2xl text-center">Find a leaf with two colors.</h3>
              <p className="text-sm text-ink/75 text-center mt-2">Green fading to yellow, red tips, or a brown edge.</p>
            </article>
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-forest text-paper py-3 px-6 rounded-xl font-display text-lg shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)]">Complete!</button>
              <button className="bg-butter text-ink py-3 px-6 rounded-xl font-display text-lg ring-1 ring-forest/30">Retake</button>
              <button className="bg-paper text-forest py-2 px-4 rounded-full text-[11px] font-bold uppercase tracking-widest ring-1 ring-forest/20">Today</button>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl p-5 ring-1 ring-forest/10 space-y-4">
          <h2 className="font-display text-2xl text-forest">Hand-drawn assets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-2">Logo / icons</p>
              <div className="flex items-center gap-3">
                <img src={cloverIcon.url} alt="" className="size-14" />
                <img src={cloverIconAlt.url} alt="" className="size-14" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-2">Washi tape</p>
              <div className="flex flex-wrap items-center gap-3">
                <img src={tape1.url} alt="" className="w-28 bg-card" />
                <img src={tape2.url} alt="" className="w-28 bg-card" />
                <img src={tape3.url} alt="" className="w-28 bg-card" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-2">Badges</p>
              <div className="flex items-center gap-3">
                <img src={badge1.url} alt="" className="size-16" />
                <img src={badge2.url} alt="" className="size-16" />
                <img src={badge3.url} alt="" className="size-16" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
