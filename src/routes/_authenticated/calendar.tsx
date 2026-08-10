import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { BottomNav, Footer } from "@/components/lucky/Nav";
import { cn } from "@/lib/utils";
import pinkTape from "@/assets/tape_2.png.asset.json";
import cloverTape from "@/assets/tape_3_v2.png.asset.json";
import { listFindings, type FindingWithUrl } from "@/lib/findings";

export const Route = createFileRoute("/_authenticated/_authenticated/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Lucky Findings" },
      { name: "description", content: "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings." },
      { property: "og:title", content: "Calendar — Lucky Findings" },
      { property: "og:description", content: "A daily nature quest that gets you outside for five minutes. One tiny prompt, one snapped photo, a growing field journal of lucky findings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const { data: findings, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["findings"],
    queryFn: () => listFindings(),
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    retry: 3,
  });
  const loading = isPending || (isError && !findings);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected: FindingWithUrl | null =
    (findings ?? []).find((f) => f.id === selectedId) ?? null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

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


  const now = new Date();
  const [view, setView] = useState(() => ({ year: now.getFullYear(), month: now.getMonth() }));
  const { year, month } = view;
  const viewDate = new Date(year, month, 1);
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
  const monthLabel = viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const today = isCurrentMonth ? now.getDate() : daysInMonth;

  function shiftMonth(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const byDay = new Map<number, FindingWithUrl>();
  for (const f of findings ?? []) {
    const d = new Date(f.completed_on + "T00:00:00");
    if (d.getFullYear() === year && d.getMonth() === month) byDay.set(d.getDate(), f);
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: startDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Stats
  const monthCompleted = byDay.size;
  const allDates = new Set((findings ?? []).map((f) => f.completed_on));
  let streak = 0;
  {
    const cur = new Date(now);
    const iso = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${dd}`;
    };
    if (!allDates.has(iso(cur))) cur.setDate(cur.getDate() - 1);
    while (allDates.has(iso(cur))) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    }
  }
  const totalFinds = (findings ?? []).length;


  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <main className="max-w-3xl mx-auto px-5 pt-5 pb-32 space-y-6 paper-grid">
        <section className="text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-forest/50 mb-1.5">
            A month of small findings
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
              className="size-8 rounded-full bg-white ring-1 ring-forest/15 flex items-center justify-center text-forest/70 hover:text-forest hover:ring-forest/40 transition"
            >
              <ChevronLeft className="size-4" />
            </button>
            <h1 className="font-display text-3xl min-w-[8.5rem]">{monthLabel}</h1>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              disabled={isCurrentMonth}
              aria-label="Next month"
              className="size-8 rounded-full bg-white ring-1 ring-forest/15 flex items-center justify-center text-forest/70 hover:text-forest hover:ring-forest/40 disabled:opacity-30 disabled:hover:ring-forest/15 transition"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          {!isCurrentMonth && (
            <button
              type="button"
              onClick={() => setView({ year: now.getFullYear(), month: now.getMonth() })}
              className="mt-1 text-[10px] uppercase tracking-widest text-forest/50 hover:text-forest underline"
            >
              back to this month
            </button>
          )}
          <p className="text-forest/60 mt-1.5 max-w-md mx-auto text-xs">
            One quest a day to get you outside. Every polaroid is a day you noticed something.
          </p>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {[
            { label: "streak of luck", value: streak, suffix: streak === 1 ? "day" : "days", bg: "bg-lime/60", ring: "ring-forest/20" },
            { label: "days outside", value: monthCompleted, suffix: `of ${daysInMonth}`, bg: "bg-sky/50", ring: "ring-forest/20" },
            { label: "lucky finds", value: totalFinds, suffix: "all-time", bg: "bg-pink/50", ring: "ring-forest/20" },
          ].map((s) => (
            <div
              key={s.label}
              className={cn(
                "rounded-xl px-2 py-2.5 text-center ring-1 shadow-[0_10px_30px_-18px_rgba(13,61,20,0.35)]",
                s.bg,
                s.ring,
              )}
            >
              <p className="font-display text-2xl leading-none text-forest">
                {loading ? <span className="inline-block h-5 w-6 rounded bg-forest/10 animate-pulse align-middle" /> : s.value}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-forest/70 mt-1.5">{s.label}</p>
              <p className="text-[9px] text-forest/50 mt-0.5">{loading ? "loading…" : s.suffix}</p>
            </div>
          ))}
        </section>
        {isError && (
          <div className="text-center text-xs text-forest/70 bg-butter/60 ring-1 ring-forest/15 rounded-lg py-2 px-3">
            Couldn't load your finds just now — nothing's lost.{" "}
            <button onClick={() => refetch()} className="underline font-semibold">
              {isFetching ? "retrying…" : "try again"}
            </button>
          </div>
        )}

        <section className="relative bg-white rounded-3xl p-4 md:p-6 shadow-[0_20px_60px_-30px_rgba(13,61,20,0.22)] ring-1 ring-forest/5">
          <img
            src={pinkTape.url}
            alt=""
            aria-hidden
            className="absolute -top-4 left-6 w-24 -rotate-6 pointer-events-none select-none drop-shadow-sm"
          />
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdayLabels.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-widest text-forest/40 py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, idx) => {
              if (day === null) return <div key={idx} className="aspect-square" />;
              const finding = byDay.get(day);
              const isToday = isCurrentMonth && day === today;
              const isFuture = day > today;
              // Vary shapes per day for whimsy
              const shapes = ["rounded-2xl", "rounded-full", "rounded-[40%_60%_55%_45%/50%_45%_55%_50%]", "rounded-[30%]"];
              const shape = shapes[day % shapes.length];
              const commonClass = cn(
                "aspect-square relative flex items-center justify-center transition-transform hover:scale-110",
                isFuture && !finding && "opacity-40",
              );
              if (finding) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedId(finding.id)}
                    className={cn(commonClass, "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-2xl")}
                    title={finding.quest_title}
                    aria-label={`${finding.quest_title} — ${new Date(finding.completed_on + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}`}
                  >
                    <div className={cn("absolute inset-0.5 overflow-hidden isolate ring-1 ring-forest/15 shadow-[0_5px_12px_-5px_rgba(13,61,20,0.35)]", shape, isToday && "ring-2 ring-forest")}>
                      {finding.photo_url ? (
                        <img src={finding.thumb_url || finding.photo_url} alt="" loading="lazy" decoding="async" className={cn("absolute inset-0 w-full h-full object-cover", shape)} />
                      ) : (
                        <div className={cn("absolute inset-0 w-full h-full bg-lime", shape)} />
                      )}
                    </div>
                    <span className="absolute top-1 left-1 z-10 text-[9px] font-bold text-forest bg-paper/95 rounded-full px-1.5 leading-tight shadow-sm">{day}</span>
                  </button>
                );
              }
              return (
                <div key={idx} className={commonClass}>
                  {loading ? (
                    <div className={cn("absolute inset-0.5 bg-forest/5 animate-pulse", shape)} />
                  ) : (
                    <div className={cn("absolute inset-0.5 border border-dashed border-forest/15 bg-paper/40 p-1.5 flex flex-col justify-between", shape, isToday && "ring-2 ring-forest ring-offset-2 ring-offset-white border-solid")}>
                      <span className="text-[10px] font-semibold text-forest/30">{day}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        <section className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-forest/15" />
            <h2 className="font-display text-lg">Recent finds</h2>
            <div className="h-px flex-1 bg-forest/15" />
          </div>
          {(findings ?? []).length === 0 ? (
            <p className="text-center text-xs text-forest/50 py-4">
              Nothing yet — snap today's quest to start your journal.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {(findings ?? []).slice(0, 8).map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(f.id)}
                    className="w-full flex items-center gap-3 bg-white rounded-lg px-2.5 py-2 ring-1 ring-forest/5 text-left hover:ring-forest/20 transition"
                  >
                    <div className="shrink-0 bg-white p-1 pb-1.5 shadow-[0_6px_14px_-6px_rgba(13,61,20,0.35)] ring-1 ring-forest/10 -rotate-3">
                      {f.photo_url ? (
                        <img src={f.thumb_url || f.photo_url} alt="" loading="lazy" decoding="async" className="size-9 object-cover" />
                      ) : (
                        <div className="size-9 bg-lime" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm leading-tight truncate">{f.quest_title}</p>
                      <p className="text-[9px] uppercase tracking-widest text-forest/40">
                        {f.quest_category} · {new Date(f.completed_on + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </p>
                      {f.caption && (
                        <p className="text-[10px] italic text-forest/60 truncate mt-0.5">"{f.caption}"</p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm flex items-center justify-center p-5 animate-fade-in"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.quest_title}
        >
          <div
            className="relative bg-paper rounded-3xl w-full max-w-sm p-5 pt-8 shadow-[0_30px_80px_-20px_rgba(13,61,20,0.5)] ring-1 ring-forest/10 paper-grid animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={cloverTape.url}
              alt=""
              aria-hidden
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 -rotate-3 pointer-events-none select-none drop-shadow-sm"
            />
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute top-2 right-2 z-10 size-8 rounded-full bg-white ring-1 ring-forest/15 flex items-center justify-center text-forest/70 hover:text-forest hover:bg-white"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <div className="bg-white p-2 pb-4 -rotate-1 shadow-[0_14px_36px_-16px_rgba(13,61,20,0.4)] ring-1 ring-forest/10">
              {selected.photo_url ? (
                <img
                  src={selected.photo_url}
                  alt={selected.quest_title}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-lime" />
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-forest/70">
                <span className={cn("size-2 rounded-full ring-1 ring-forest/30", categoryDotClass(selected.quest_category))} />
                {selected.quest_category}
              </p>
              <h3 className="font-display text-xl leading-tight mt-1.5 text-balance">{selected.quest_title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mt-1">
                {new Date(selected.completed_on + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
              </p>
              {selected.caption && (
                <p className="text-sm italic text-ink/75 mt-3 text-balance">"{selected.caption}"</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <BottomNav />
    </div>
  );
}
