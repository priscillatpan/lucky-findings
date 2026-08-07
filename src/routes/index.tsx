import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import logoClover from "@/assets/icon_1.png.asset.json";
import bgClover from "@/assets/background.png.asset.json";
import cloverTape from "@/assets/tape_3_v2.png.asset.json";

import shotToday1 from "@/assets/shot_today1.png.asset.json";
import shotToday2 from "@/assets/shot_today2.png.asset.json";
import shotToday3 from "@/assets/shot_today3.png.asset.json";
import shotCalendar from "@/assets/shot_cal_july.png.asset.json";
import { unlockSite } from "@/lib/gate.functions";

// Waitlist form (Tally), embedded inline.
const WAITLIST_EMBED_URL = "https://tally.so/embed/QKqXrp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucky Findings — a little luck, once a day" },
      {
        name: "description",
        content:
          "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings.",
      },
      { property: "og:title", content: "Lucky Findings — a little luck, once a day" },
      {
        property: "og:description",
        content:
          "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ src: "https://tally.so/widgets/embed.js", async: true }],
  }),
  component: Landing,
});


function Landing() {
  return (
    <div className="min-h-[100dvh] bg-paper text-ink paper-grid relative overflow-hidden">
      <img
        src={bgClover.url}
        alt=""
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] opacity-[0.08] pointer-events-none rotate-12"
      />
      <main className="relative max-w-md mx-auto px-8 pt-8 pb-10">
        <Hero />
        <Waitlist />
        <HowItWorks />
        <PeekInside />

        <SecretDoor />
        <Footer />
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-4 text-center">
      <a
        href="https://www.instagram.com/priscilla.png/"
        target="_blank"
        rel="noreferrer"
        className="text-[11px] text-ink/50 hover:text-forest transition-colors"
      >
        made with love by priscilla
      </a>
    </footer>
  );
}

function Hero() {
  return (
    <header className="text-center pt-2">
      <img
        src={logoClover.url}
        alt="Lucky Findings clover"
        className="size-12 -rotate-6 object-contain mx-auto"
      />
      <h1 className="font-display text-3xl leading-tight mt-2 text-forest">Lucky Findings</h1>
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1">
        daily creative tasks
      </p>
    </header>
  );
}

function Waitlist() {
  const [height, setHeight] = useState(260);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "string" || !e.data.includes("Tally.")) return;
      try {
        const payload = JSON.parse(e.data);
        const newHeight = payload?.payload?.height;
        if (newHeight && (payload?.event === "Tally.FormLoaded" || payload?.event === "Tally.HeightChanged")) {
          setHeight(newHeight);
        }
      } catch {
        /* ignore */
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section className="mt-8">
      <div className="relative bg-card rounded-2xl ring-1 ring-forest/15 border-b-4 border-forest/10 p-5 pt-6 shadow-[0_14px_40px_-24px_rgba(13,61,20,0.35)]">
        <img
          src={cloverTape.url}
          alt=""
          aria-hidden
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 rotate-2 object-contain pointer-events-none"
        />
        <div className="text-center mb-4">
          <p className="font-display text-xl text-forest">Coming soon! 🍀</p>
          <p className="text-sm text-ink/70 mt-1">
            Join the waitlist & we'll email when the app is ready.
          </p>
        </div>
        <iframe
          src={`${WAITLIST_EMBED_URL}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          title="Join the Lucky Findings waitlist"
          loading="lazy"
          width="100%"
          height={height}
          style={{ border: 0, margin: 0 }}
        />
      </div>
    </section>
  );
}


const STEPS = [
  {
    n: "1",
    title: "Receive your quest",
    body: "Every morning a new quest arrives.",
    dot: "bg-lime",
  },
  {
    n: "2",
    title: "Go outside",
    body: "Complete your quest in <5 minutes. Search, notice, or make something.",
    dot: "bg-sky",
  },
  {
    n: "3",
    title: "Snap it",
    body: "Take a photo to stamp the day.",
    dot: "bg-pink",
  },
];

function HowItWorks() {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg text-forest text-center">How it works</h2>
      <ul className="mt-4 flex flex-col gap-4">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="flex items-start gap-4"
          >
            <span
              className={`inline-grid shrink-0 size-8 rounded-full ${s.dot} text-forest font-display text-base place-items-center ring-1 ring-forest/30`}
            >
              {s.n}
            </span>
            <div className="pt-1">
              <p className="font-display text-sm leading-none text-forest">{s.title}</p>
              <p className="text-sm text-ink/70 mt-1 leading-snug">{s.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const SHOTS = [
  { src: shotToday1.url, label: "Today" },
  { src: shotToday2.url, label: "Today" },
  { src: shotToday3.url, label: "Today" },
  { src: shotCalendar.url, label: "Calendar" },
];

function PeekInside() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % SHOTS.length), step === 3 ? 3600 : 1500);
    return () => clearTimeout(t);
  }, [step]);

  const shot = SHOTS[step]!;

  return (
    <section className="mt-10">
      <h2 className="font-display text-lg text-forest text-center">A peek inside</h2>
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-[160px] rounded-[2rem] bg-forest p-1.5 shadow-[0_26px_60px_-26px_rgba(13,61,20,0.55)]">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-forest rounded-b-2xl z-20" />
            <div className="relative w-full aspect-[1170/2532] rounded-[1.65rem] overflow-hidden bg-paper">
              {SHOTS.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt="Lucky Findings app screen"
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                    i === step ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-forest/55">{shot.label}</p>
        </div>
      </div>
    </section>
  );
}

function SecretDoor() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [taps, setTaps] = useState(0);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  function onTap() {
    const next = taps + 1;
    setTaps(next);
    if (next >= 3) setOpen(true);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const { ok } = await unlock({ data: { password } });
    setBusy(false);
    if (ok) {
      await router.invalidate();
      await router.navigate({ to: "/today" });
    } else {
      setError(true);
    }
  }

  return (
    <footer className="mt-4 text-center">
      <button
        type="button"
        onClick={onTap}
        aria-label="Lucky Findings clover"
        className="p-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <img src={logoClover.url} alt="" aria-hidden className="size-8 rotate-3 object-contain" />
      </button>

      {open && (
        <form onSubmit={onSubmit} className="w-full max-w-[15rem] mx-auto mt-4">
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="password"
              style={{ fontSize: "16px" }}
              className="w-full px-3 pr-10 py-2 rounded-xl bg-card ring-1 ring-forest/25 outline-none focus:ring-forest/50 text-center"
            />
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-forest/50 hover:text-forest transition-colors"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-[11px] text-red-700 mt-2">Not quite — try again</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full mt-2 bg-forest text-paper py-2 rounded-xl font-display text-base disabled:opacity-60"
          >
            {busy ? "Checking…" : "Enter"}
          </button>
        </form>
      )}
    </footer>
  );
}
