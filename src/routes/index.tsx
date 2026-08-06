import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import cloverIcon from "@/assets/icon_2.png.asset.json";
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
          "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings. Join the waitlist.",
      },
      { property: "og:title", content: "Lucky Findings — a little luck, once a day" },
      {
        property: "og:description",
        content:
          "A daily nature quest that gets you outside for five minutes. One prompt, one photo, a field journal of small lucky findings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});


function Landing() {
  return (
    <div className="min-h-[100dvh] bg-paper text-ink paper-grid">
      <main className="max-w-md mx-auto px-6 pt-14 pb-20">
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
    <footer className="mt-12 text-center">
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
    <header className="text-center">
      <img
        src={cloverIcon.url}
        alt="Lucky Findings clover"
        className="size-14 -rotate-6 object-contain mx-auto"
      />
      <h1 className="font-display text-4xl leading-tight mt-3 text-forest">Lucky Findings</h1>
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-2">
        a little luck, once a day
      </p>
      <p className="text-sm text-ink/75 mt-4 leading-relaxed">
        Daily, creative quests to get you outside
      </p>
    </header>
  );
}

function Waitlist() {
  const [height, setHeight] = useState(220);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "string" || !e.data.includes("Tally.FormLoaded")) return;
      try {
        const payload = JSON.parse(e.data);
        if (payload?.event === "Tally.FormLoaded" && payload?.payload?.height) {
          setHeight(payload.payload.height);
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
      <div className="relative bg-card rounded-2xl ring-1 ring-forest/20 border-b-4 border-forest/15 p-4 pt-5 shadow-[0_14px_40px_-24px_rgba(13,61,20,0.45)]">
        <img
          src={cloverTape.url}
          alt=""
          aria-hidden
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 rotate-2 object-contain pointer-events-none"
        />
        <p className="text-center font-display text-lg text-forest mt-1">Coming soon! 🍀</p>
        <p className="text-center text-[11px] text-ink/55 mt-1 mb-1">
          Drop in your email and we'll email you when the app is ready.
        </p>
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
    body: "Every morning a new quest arrives, waiting for you to complete.",
    dot: "bg-lime",
  },
  {
    n: "2",
    title: "Go outside",
    body: "Complete your quest in under 5 minutes — search, notice, make, wander, or meet someone. You might even find something lucky.",
    dot: "bg-sky",
  },
  {
    n: "3",
    title: "Snap it",
    body: "Take a photo to stamp the day into your calendar.",
    dot: "bg-pink",
  },
];

function HowItWorks() {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-forest text-center">How it works</h2>
      <ul className="mt-4 space-y-3">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="bg-card rounded-2xl ring-1 ring-forest/15 border-b-4 border-forest/10 p-4 flex gap-3"
          >
            <span
              className={`shrink-0 size-7 rounded-full ${s.dot} text-forest font-display text-base flex items-center justify-center ring-1 ring-forest/30`}
            >
              {s.n}
            </span>
            <div>
              <p className="font-display text-lg leading-none text-forest">{s.title}</p>
              <p className="text-[12px] text-ink/70 mt-1.5 leading-relaxed">{s.body}</p>
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
    <section className="mt-12">
      <h2 className="font-display text-2xl text-forest text-center">A peek inside</h2>
      <div className="mt-5 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-[240px] rounded-[2.25rem] bg-forest p-2 shadow-[0_26px_60px_-26px_rgba(13,61,20,0.55)]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-forest rounded-b-2xl z-10" />
            <div className="w-full aspect-[390/844] rounded-[1.85rem] overflow-hidden bg-paper">
              {SHOTS.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt="Lucky Findings app screen"
                  loading="lazy"
                  className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                    i === step ? "opacity-100" : "opacity-0 absolute inset-2"
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
    <footer className="mt-16 text-center">
      <button
        type="button"
        onClick={onTap}
        aria-label="Lucky Findings clover"
        className="p-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <img src={cloverIcon.url} alt="" aria-hidden className="size-8 rotate-3 object-contain" />
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
