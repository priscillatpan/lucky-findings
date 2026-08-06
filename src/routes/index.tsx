import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import cloverIcon from "@/assets/icon_2.png.asset.json";
import cloverTape from "@/assets/tape_3_v2.png.asset.json";
import pinkTape from "@/assets/tape_2.png.asset.json";
import { unlockSite } from "@/lib/gate.functions";

// Drop your Tally / Typeform / etc. link here when it's ready.
// Leave empty to show the built-in "you're on the list" confirmation.
const WAITLIST_URL = "";

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

const emailSchema = z
  .string()
  .trim()
  .email({ message: "That email looks a little off" })
  .max(255);

function Landing() {
  return (
    <div className="min-h-[100dvh] bg-paper text-ink paper-grid">
      <main className="max-w-md mx-auto px-6 pt-14 pb-20">
        <Hero />
        <Waitlist />
        <HowItWorks />
        <PeekInside />
        <QuestExamples />
        <SecretDoor />
      </main>
    </div>
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
        One tiny nature quest a day. Takes five minutes, gets you outside, and leaves you with a
        field journal of small lucky findings.
      </p>
    </header>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    if (WAITLIST_URL) {
      window.location.href = `${WAITLIST_URL}?email=${encodeURIComponent(parsed.data)}`;
      return;
    }
    setDone(true);
  }

  return (
    <section className="mt-8">
      <div className="relative bg-card rounded-2xl ring-1 ring-forest/20 border-b-4 border-forest/15 p-5 shadow-[0_14px_40px_-24px_rgba(13,61,20,0.45)]">
        <img
          src={cloverTape.url}
          alt=""
          aria-hidden
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 rotate-2 object-contain pointer-events-none"
        />
        {done ? (
          <div className="text-center py-2">
            <p className="font-display text-2xl text-forest">You're on the list 🍀</p>
            <p className="text-[12px] text-ink/60 mt-1">
              I'll email you the moment it opens up.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-2">
            <p className="text-center font-display text-xl text-forest">Join the waitlist</p>
            <p className="text-center text-[11px] text-ink/55 mt-1 mb-3">
              Early access, no spam, one clover at a time.
            </p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              maxLength={255}
              style={{ fontSize: "16px" }}
              className="w-full px-3 py-2.5 rounded-xl bg-paper ring-1 ring-forest/25 outline-none focus:ring-forest/50 text-center"
            />
            {error && <p className="text-[11px] text-red-700 text-center mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-3 bg-forest text-paper py-2.5 rounded-xl font-display text-lg shadow-[0_10px_24px_-10px_rgba(13,102,34,0.6)]"
            >
              Save my spot
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "1",
    title: "Get a quest",
    body: "Every morning a new five-minute prompt lands — notice, search, make, or wander.",
    dot: "bg-lime",
  },
  {
    n: "2",
    title: "Go outside",
    body: "Head out, look properly, and find the thing. Swap the quest if it's not your day.",
    dot: "bg-sky",
  },
  {
    n: "3",
    title: "Snap it",
    body: "One photo (plus a note if you like) stamps the day into your calendar.",
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

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[152px] h-[310px] rounded-[1.75rem] bg-forest p-1.5 shadow-[0_20px_50px_-24px_rgba(13,61,20,0.55)]">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-forest rounded-b-xl z-10" />
        <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-paper paper-grid relative">
          {children}
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-forest/55">{label}</p>
    </div>
  );
}

function TodayPreview() {
  return (
    <div className="p-2.5 pt-5 h-full flex flex-col">
      <p className="text-[8px] uppercase tracking-[0.2em] text-forest/50 text-center">
        Lucky Findings
      </p>
      <p className="font-display text-[13px] text-forest text-center mt-0.5">Today's Quest</p>
      <div className="relative mt-3 bg-card rounded-lg ring-1 ring-forest/20 border-l-4 border-l-sky p-2.5">
        <img
          src={cloverTape.url}
          alt=""
          aria-hidden
          className="absolute -top-2.5 right-2 w-9 rotate-6 object-contain"
        />
        <span className="inline-flex items-center gap-1 text-[7px] uppercase tracking-[0.15em] text-forest/60">
          <span className="size-1.5 rounded-full bg-sky" /> Notice
        </span>
        <p className="font-display text-[12px] leading-snug text-ink mt-1">
          Find a shape in the clouds
        </p>
      </div>
      <p className="text-[7px] text-center text-forest/40 mt-1.5">swap quest</p>
      <div className="mt-auto">
        <div className="bg-forest text-paper text-[9px] font-display text-center rounded-lg py-1.5">
          Complete
        </div>
        <div className="mt-2 mx-auto w-[92%] bg-paper/90 rounded-full ring-1 ring-forest/15 flex text-[7px] uppercase tracking-widest text-forest/70">
          <span className="flex-1 text-center py-1 rounded-full bg-lime text-forest">Today</span>
          <span className="flex-1 text-center py-1">Calendar</span>
        </div>
      </div>
    </div>
  );
}

const CAL_SHAPES = [
  "rounded-[40%_60%_55%_45%/50%_45%_55%_50%]",
  "rounded-lg",
  "rounded-full",
  "rounded-[45%_55%_40%_60%/55%_40%_60%_45%]",
];
const CAL_FILLS = ["bg-lime", "bg-sky", "bg-pink", "bg-butter"];

function CalendarPreview() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const filled = new Set([2, 3, 5, 8, 9, 12, 13, 16, 19, 20, 23, 26]);
  return (
    <div className="p-2.5 pt-5 h-full flex flex-col">
      <p className="font-display text-[13px] text-forest text-center">August</p>
      <div className="flex gap-1 mt-2">
        <div className="flex-1 bg-lime/70 rounded-md py-1 text-center ring-1 ring-forest/15">
          <p className="font-display text-[11px] leading-none text-forest">12</p>
          <p className="text-[5.5px] uppercase tracking-widest text-forest/70 mt-0.5">
            days outside
          </p>
        </div>
        <div className="flex-1 bg-pink/60 rounded-md py-1 text-center ring-1 ring-forest/15">
          <p className="font-display text-[11px] leading-none text-forest">4</p>
          <p className="text-[5.5px] uppercase tracking-widest text-forest/70 mt-0.5">
            streak of luck
          </p>
        </div>
      </div>
      <div className="relative mt-2 bg-card rounded-lg ring-1 ring-forest/15 p-1.5">
        <img
          src={pinkTape.url}
          alt=""
          aria-hidden
          className="absolute -top-2 left-3 w-9 -rotate-6 object-contain"
        />
        <div className="grid grid-cols-7 gap-[3px]">
          {days.map((d) => {
            const on = filled.has(d);
            return (
              <div
                key={d}
                className={`aspect-square flex items-center justify-center text-[6px] text-forest/60 ${
                  on
                    ? `${CAL_FILLS[d % 4]} ${CAL_SHAPES[d % 4]} ring-1 ring-forest/20`
                    : "rounded-[4px] bg-paper/60"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto mx-auto w-[92%] bg-paper/90 rounded-full ring-1 ring-forest/15 flex text-[7px] uppercase tracking-widest text-forest/70">
        <span className="flex-1 text-center py-1">Today</span>
        <span className="flex-1 text-center py-1 rounded-full bg-sky text-forest">Calendar</span>
      </div>
    </div>
  );
}

function PeekInside() {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-forest text-center">A peek inside</h2>
      <div className="mt-5 flex justify-center gap-4">
        <PhoneFrame label="Today">
          <TodayPreview />
        </PhoneFrame>
        <PhoneFrame label="Calendar">
          <CalendarPreview />
        </PhoneFrame>
      </div>
    </section>
  );
}

const EXAMPLES: { text: string; cat: string; dot: string }[] = [
  { text: "Find a shape in the clouds", cat: "Notice", dot: "bg-sky" },
  { text: "Find the oldest thing you can see", cat: "Search", dot: "bg-lime" },
  { text: "Follow whichever way the wind's blowing", cat: "Serendipity", dot: "bg-pink" },
  { text: "Find something someone dropped and left behind", cat: "Search", dot: "bg-lime" },
];

function QuestExamples() {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-forest text-center">Quests you might get</h2>
      <ul className="mt-4 space-y-2">
        {EXAMPLES.map((q) => (
          <li
            key={q.text}
            className="bg-card rounded-xl ring-1 ring-forest/15 px-3.5 py-2.5 flex items-center gap-2.5"
          >
            <span className={`size-2 rounded-full shrink-0 ${q.dot}`} />
            <span className="text-[13px] text-ink/85">{q.text}</span>
            <span className="ml-auto text-[8px] uppercase tracking-[0.15em] text-forest/45">
              {q.cat}
            </span>
          </li>
        ))}
      </ul>
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
      <p className="text-[10px] uppercase tracking-[0.25em] text-forest/40">
        hand-crafted · no. 001
      </p>

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
