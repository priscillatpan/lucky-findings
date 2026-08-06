import { createFileRoute, Link } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { isUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/mockup")({
  beforeLoad: async () => {
    const { unlocked } = await isUnlocked();
    if (!unlocked) throw redirect({ to: "/unlock" });
  },
  head: () => ({
    meta: [
      { title: "Lucky Findings — Screens Mockup" },
      { name: "description", content: "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings." },
      { property: "og:title", content: "Lucky Findings — Screens Mockup" },
      { property: "og:description", content: "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MockupPage,
});

function Phone({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[320px] h-[680px] rounded-[2.5rem] bg-forest p-2 shadow-[0_30px_80px_-30px_rgba(13,61,20,0.5)] ring-1 ring-forest/40">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-forest rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[2rem] overflow-hidden bg-paper">
          <iframe
            src={src}
            title={label}
            className="w-full h-full border-0"
            style={{ width: "320px", height: "664px" }}
          />
        </div>
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/70">{label}</p>
    </div>
  );
}

function MockupPage() {
  return (
    <div className="min-h-[100dvh] bg-paper text-ink paper-grid">
      <header className="max-w-5xl mx-auto px-5 pt-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-forest">Screens</h1>
        <Link
          to="/mockup-flash"
          className="text-[11px] font-semibold uppercase tracking-widest text-forest/70 hover:text-forest underline underline-offset-4 decoration-2 decoration-lime"
        >
          Cycling demo →
        </Link>
      </header>
      <main className="max-w-5xl mx-auto px-5 py-10 flex flex-wrap gap-10 justify-center">
        <Phone src="/today" label="Today" />
        <Phone src="/calendar" label="Calendar" />
      </main>
    </div>
  );
}
