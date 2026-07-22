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

const PHONE_WIDTH = 280;
const PHONE_HEIGHT = 570;
const SCALE = 0.65;

function Phone({ label, path }: { label: string; path: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative bg-[#111] rounded-[2.25rem] p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transform: `scale(${SCALE})`,
          transformOrigin: "top center",
        }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[1.75rem] overflow-hidden bg-white">
          <iframe
            title={label}
            src={path}
            className="w-full h-full border-0"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <p className="font-display text-sm text-forest">{label}</p>
    </div>
  );
}

function MockupPage() {
  return (
    <div className="min-h-screen bg-paper py-6 px-6">
      <header className="text-center mb-6">
        <h1 className="font-display text-2xl text-forest">Lucky Findings</h1>
        <p className="text-forest/60 mt-1 text-xs">
          side-by-side screens ·{" "}
          <a href="/ui-kit" className="underline decoration-forest/40 hover:decoration-forest">
            UI kit →
          </a>
        </p>
      </header>
      <div
        className="flex justify-center items-start gap-2"
        style={{ minHeight: PHONE_HEIGHT * SCALE + 60 }}
      >
        {screens.map((s) => (
          <Phone key={s.path} {...s} />
        ))}
      </div>
    </div>
  );
}
