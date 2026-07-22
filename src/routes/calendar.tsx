import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BottomNav, Footer } from "@/components/lucky/Nav";
import { cn } from "@/lib/utils";
import pinkTape from "@/assets/tape_2.png.asset.json";
import { listFindings, type FindingWithUrl } from "@/lib/findings";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Lucky Findings" },
      { name: "description", content: "A month at a glance — every day you snapped a finding, mapped like a stamp album across the calendar." },
      { property: "og:title", content: "Calendar — Lucky Findings" },
      { property: "og:description", content: "A month at a glance — every day you snapped a finding, mapped like a stamp album." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const { data: findings } = useQuery({
    queryKey: ["findings"],
    queryFn: () => listFindings(),
  });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthLabel = now.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const today = now.getDate();

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
      <main className="max-w-3xl mx-auto px-6 pt-6 pb-40 space-y-10 paper-grid">
        <section className="relative">
          <img
            src={pinkTape.url}
            alt=""
            aria-hidden
            className="absolute -top-6 right-4 w-32 rotate-6 pointer-events-none select-none opacity-90"
          />
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/50 mb-3">
              A month of small findings
            </p>
            <h1 className="font-display text-5xl">{monthLabel}</h1>
            <p className="text-forest/60 mt-3 max-w-md mx-auto text-sm">
              One quest a day to get you outside. Every polaroid is a day you noticed something — the empty squares are just waiting.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {[
            { label: "streak of luck", value: streak, suffix: streak === 1 ? "day" : "days" },
            { label: "days outside", value: monthCompleted, suffix: `of ${daysInMonth} this month` },
            { label: "lucky finds", value: totalFinds, suffix: "all-time" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl px-3 py-4 text-center ring-1 ring-forest/10 shadow-[0_10px_30px_-18px_rgba(13,61,20,0.35)]"
            >
              <p className="font-display text-4xl leading-none text-forest">{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-forest/50 mt-2">{s.label}</p>
              <p className="text-[10px] text-forest/40 mt-0.5">{s.suffix}</p>
            </div>
          ))}
        </section>



        <section className="bg-white rounded-3xl p-4 md:p-6 shadow-[0_20px_60px_-30px_rgba(13,61,20,0.22)] ring-1 ring-forest/5">
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
              const isToday = day === today;
              const isFuture = day > today;
              const rot = day % 3 === 0 ? "-rotate-[3deg]" : day % 3 === 1 ? "rotate-[2deg]" : "rotate-[-1deg]";
              return (
                <div
                  key={idx}
                  className={cn(
                    "aspect-square relative flex items-center justify-center transition-transform hover:rotate-0 hover:scale-110",
                    isFuture && !finding && "opacity-40",
                  )}
                  title={finding?.quest_title}
                >
                  {finding ? (
                    <div className={cn("absolute inset-0.5 bg-white p-1 pb-2.5 shadow-[0_5px_12px_-5px_rgba(13,61,20,0.4)] ring-1 ring-forest/10 flex flex-col", rot, isToday && "ring-2 ring-forest")}>
                      {finding.photo_url ? (
                        <img src={finding.photo_url} alt="" className="flex-1 w-full object-cover" />
                      ) : (
                        <div className="flex-1 bg-lime" />
                      )}
                      <span className="absolute bottom-0.5 right-1 text-[8px] font-semibold text-forest/60">{day}</span>
                    </div>
                  ) : (
                    <div className={cn("absolute inset-0.5 rounded-xl border border-dashed border-forest/15 bg-paper/40 p-1.5 flex flex-col justify-between", isToday && "ring-2 ring-forest ring-offset-2 ring-offset-white border-solid")}>
                      <span className="text-[10px] font-semibold text-forest/30">{day}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-forest/15" />
            <h2 className="font-display text-2xl">Recent finds</h2>
            <div className="h-px flex-1 bg-forest/15" />
          </div>
          {(findings ?? []).length === 0 ? (
            <p className="text-center text-sm text-forest/50 py-6">
              Nothing yet — snap today's quest to start your journal.
            </p>
          ) : (
            <ul className="space-y-2">
              {(findings ?? []).slice(0, 8).map((f) => (
                <li key={f.id} className="flex items-center gap-4 bg-white rounded-xl px-3 py-3 ring-1 ring-forest/5">
                  <div className="shrink-0 bg-white p-1 pb-2 shadow-[0_6px_14px_-6px_rgba(13,61,20,0.35)] ring-1 ring-forest/10 -rotate-3">
                    {f.photo_url ? (
                      <img src={f.photo_url} alt="" className="size-11 object-cover" />
                    ) : (
                      <div className="size-11 bg-lime" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg leading-tight truncate">{f.quest_title}</p>
                    <p className="text-[10px] uppercase tracking-widest text-forest/40">
                      {f.quest_category} · {new Date(f.completed_on + "T00:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />

      <BottomNav />
    </div>
  );
}
