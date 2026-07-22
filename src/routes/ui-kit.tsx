import { createFileRoute } from "@tanstack/react-router";
import cloverIcon from "@/assets/icon_2.png.asset.json";
import cloverIconAlt from "@/assets/icon_1.png.asset.json";
import tape1 from "@/assets/tape_1.png.asset.json";
import tape2 from "@/assets/tape_2.png.asset.json";
import tape3 from "@/assets/tape_3.png.asset.json";
import badge1 from "@/assets/badge_1.png.asset.json";
import badge2 from "@/assets/badge_2.png.asset.json";
import badge3 from "@/assets/badge_3.png.asset.json";

export const Route = createFileRoute("/ui-kit")({
  head: () => ({
    meta: [
      { title: "UI Kit — Lucky Findings" },
      { name: "description", content: "The Lucky Findings design system — colors, type, components, and hand-drawn assets in one place." },
      { property: "og:title", content: "UI Kit — Lucky Findings" },
      { property: "og:description", content: "The Lucky Findings design system reference." },
    ],
  }),
  component: UiKit,
});

const swatches = [
  { name: "Butter", token: "butter", hex: "#fbfa74", note: "Default card / soft highlight" },
  { name: "Lime", token: "lime", hex: "#e2f657", note: "Search category · fresh accent" },
  { name: "Forest", token: "forest", hex: "#0d6622", note: "Primary · type, buttons, borders" },
  { name: "Sky", token: "sky", hex: "#50b4f8", note: "Notice category · cool accent" },
  { name: "Pink", token: "pink", hex: "#e78dd7", note: "Serendipity · tape, badges" },
  { name: "Paper", token: "paper", hex: "#fbf7ec", note: "Background · warm cream" },
  { name: "Ink", token: "ink", hex: "#143b1c", note: "Body text" },
];

const categories = [
  { name: "Search", dot: "bg-lime" },
  { name: "Notice", dot: "bg-sky" },
  { name: "Serendipity", dot: "bg-pink" },
  { name: "Encounter", dot: "bg-butter" },
  { name: "Make", dot: "bg-forest" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-2xl text-forest">{title}</h2>
        <div className="h-px flex-1 bg-forest/15" />
      </div>
      {children}
    </section>
  );
}

function UiKit() {
  return (
    <div className="min-h-screen bg-paper text-ink paper-grid">
      <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
        <header>
          <div className="flex items-center gap-3">
            <img src={cloverIcon.url} alt="" className="size-10" />
            <div>
              <h1 className="font-display text-4xl text-forest leading-none">Lucky Findings — UI kit</h1>
              <p className="text-forest/60 text-sm mt-1">Colors, type, components & hand-drawn bits.</p>
            </div>
          </div>
        </header>

        <Section title="Palette">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {swatches.map((s) => (
              <div key={s.token} className="bg-white rounded-2xl overflow-hidden ring-1 ring-forest/10 shadow-[0_10px_30px_-18px_rgba(13,61,20,0.35)]">
                <div className="h-24" style={{ background: s.hex }} />
                <div className="p-3">
                  <p className="font-display text-lg leading-none">{s.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-forest/50 mt-1">{s.hex}</p>
                  <p className="text-xs text-forest/70 mt-1.5">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="bg-white rounded-2xl p-6 ring-1 ring-forest/10 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50">Display · Gloock</p>
              <p className="font-display text-5xl leading-none mt-1">Today's Quest</p>
              <p className="font-display text-3xl leading-none mt-2">A little luck, once a day.</p>
            </div>
            <div className="h-px bg-forest/10" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50">Body · Inter</p>
              <p className="text-base mt-1">Find a leaf with two colors — green fading to yellow, red tips, or a brown edge.</p>
              <p className="text-sm text-forest/70 mt-1">Small caption text sits at 14px, muted forest.</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-forest/50 mt-2">Metadata / tag text</p>
            </div>
          </div>
        </Section>

        <Section title="Categories">
          <div className="bg-white rounded-2xl p-6 ring-1 ring-forest/10 flex flex-wrap gap-4">
            {categories.map((c) => (
              <span key={c.name} className="flex items-center gap-2 bg-paper rounded-full px-3 py-1.5 ring-1 ring-forest/15">
                <span className={"size-2.5 rounded-full ring-1 ring-forest/30 " + c.dot} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest/80">{c.name}</span>
              </span>
            ))}
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid md:grid-cols-2 gap-4">
            <article className="bg-butter/70 rounded-2xl p-6 pt-10 ring-1 ring-forest/20 border-2 border-forest/30 relative">
              <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-forest/70">
                <span className="size-2.5 rounded-full ring-1 ring-forest/30 bg-sky" />
                Notice
              </span>
              <h3 className="font-display text-2xl text-center">Find a leaf with two colors.</h3>
              <p className="text-sm text-ink/75 text-center mt-2">Green fading to yellow, red tips, or a brown edge.</p>
            </article>
            <div className="bg-white rounded-2xl p-4 ring-1 ring-forest/10 shadow-[0_10px_30px_-18px_rgba(13,61,20,0.35)] flex items-center gap-4">
              <div className="bg-white p-1 pb-2 shadow-md ring-1 ring-forest/10 -rotate-3">
                <div className="size-14 bg-lime" />
              </div>
              <div>
                <p className="font-display text-lg leading-tight">Pocket rock, promoted</p>
                <p className="text-[10px] uppercase tracking-widest text-forest/50">Search · July 14</p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="bg-white rounded-2xl p-6 ring-1 ring-forest/10 flex flex-wrap gap-3 items-center">
            <button className="bg-forest text-paper py-3 px-6 rounded-xl font-display text-lg shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)]">Complete!</button>
            <button className="bg-butter text-ink py-3 px-6 rounded-xl font-display text-lg ring-1 ring-forest/30">Retake</button>
            <button className="bg-paper text-forest py-2 px-4 rounded-full text-[11px] font-bold uppercase tracking-widest ring-1 ring-forest/20">Today</button>
            <button className="bg-forest text-paper py-2 px-4 rounded-full text-[11px] font-bold uppercase tracking-widest">Calendar</button>
          </div>
        </Section>

        <Section title="Hand-drawn assets">
          <div className="bg-white rounded-2xl p-6 ring-1 ring-forest/10 space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Logo / icons</p>
              <div className="flex items-center gap-6">
                <img src={cloverIcon.url} alt="" className="size-16" />
                <img src={cloverIconAlt.url} alt="" className="size-16" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Tape</p>
              <div className="flex flex-col gap-4">
                <img src={tape1.url} alt="" className="w-56" />
                <img src={tape2.url} alt="" className="w-56" />
                <img src={tape3.url} alt="" className="w-56" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Badges</p>
              <div className="flex items-center gap-4">
                <img src={badge1.url} alt="" className="size-20" />
                <img src={badge2.url} alt="" className="size-20" />
                <img src={badge3.url} alt="" className="size-20" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
