import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup")({
  head: () => ({
    meta: [
      { title: "Lucky Findings — Screen Mockups" },
      { name: "description", content: "Side-by-side mobile mockups of the Lucky Findings app." },
      { property: "og:title", content: "Lucky Findings — Screen Mockups" },
      { property: "og:description", content: "Side-by-side mobile mockups of the Lucky Findings app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MockupPage,
});

const screens: { label: string; path: string }[] = [
  { label: "Today's Quest", path: "/?mock=1" },
  { label: "Field Journal", path: "/calendar?mock=1" },
];

function Phone({ label, path }: { label: string; path: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative bg-[#111] rounded-[3rem] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
        style={{ width: 390, height: 780 }}
      >
        {/* notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[2.25rem] overflow-hidden bg-white">
          <iframe
            title={label}
            src={path}
            className="w-full h-full border-0"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <p className="font-display text-xl text-forest">{label}</p>
    </div>
  );
}

function MockupPage() {
  return (
    <div className="min-h-screen bg-paper py-12 px-8">
      <header className="text-center mb-10">
        <h1 className="font-display text-5xl text-forest">Lucky Findings — mockup</h1>
        <p className="text-forest/60 mt-2 text-sm">All screens, side by side.</p>
      </header>
      <div className="flex flex-wrap justify-center gap-10">
        {screens.map((s) => (
          <Phone key={s.path} {...s} />
        ))}
      </div>
    </div>
  );
}
