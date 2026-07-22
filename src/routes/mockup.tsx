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
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative bg-[#111] rounded-[2.25rem] p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]"
        style={{ width: 280, height: 570 }}
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
      <p className="font-display text-lg text-forest">{label}</p>
    </div>
  );
}

function MockupPage() {
  return (
    <div className="min-h-screen bg-paper py-8 px-6">
      <header className="text-center mb-8">
        <h1 className="font-display text-4xl text-forest">Lucky Findings — mockup</h1>
        <p className="text-forest/60 mt-2 text-sm">
          All screens, side by side.{" "}
          <a href="/ui-kit" className="underline decoration-forest/40 hover:decoration-forest">
            View the UI kit →
          </a>
        </p>
      </header>
      <div className="flex flex-wrap justify-center items-start gap-8">
        {screens.map((s) => (
          <Phone key={s.path} {...s} />
        ))}
      </div>
    </div>
  );
}

