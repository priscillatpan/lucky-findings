import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/lucky/Nav";
import cloverTape from "@/assets/tape_3.png.asset.json";
import cloverBg from "@/assets/background.png.asset.json";
import { questForDate } from "@/data/quests";
import { getFindingForDate, listFindings, saveFinding } from "@/lib/findings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today's Quest — Lucky Findings" },
      { name: "description", content: "Your daily nature quest — one tiny prompt, one snapped photo, a growing field journal of small lucky findings." },
      { property: "og:title", content: "Today's Quest — Lucky Findings" },
      { property: "og:description", content: "A daily nature quest journal. One tiny prompt, one snapped photo, a growing collection of lucky findings." },
    ],
  }),
  component: Home,
});

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}

function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  let streak = 0;
  const cur = new Date();
  const y = cur.getFullYear();
  const m = String(cur.getMonth() + 1).padStart(2, "0");
  const d = String(cur.getDate()).padStart(2, "0");
  const todayStr = `${y}-${m}-${d}`;
  if (!set.has(todayStr)) cur.setDate(cur.getDate() - 1);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const yy = cur.getFullYear();
    const mm = String(cur.getMonth() + 1).padStart(2, "0");
    const dd = String(cur.getDate()).padStart(2, "0");
    const key = `${yy}-${mm}-${dd}`;
    if (set.has(key)) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else break;
  }
  return streak;
}

function Home() {
  const today = new Date();
  const quest = questForDate(today);
  const qc = useQueryClient();

  const { data: todayFinding } = useQuery({
    queryKey: ["finding", "today"],
    queryFn: () => getFindingForDate(today),
  });
  const { data: all } = useQuery({
    queryKey: ["findings"],
    queryFn: () => listFindings(),
  });

  const streak = computeStreak((all ?? []).map((f) => f.completed_on));

  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ file: File; preview: string } | null>(null);
  const [caption, setCaption] = useState("");

  const save = useMutation({
    mutationFn: async () => {
      if (!pending) throw new Error("No photo");
      return saveFinding({
        file: pending.file,
        questId: quest.id,
        questTitle: quest.title,
        questCategory: quest.category,
        caption: caption.trim() || undefined,
      });
    },
    onSuccess: () => {
      setPending(null);
      setCaption("");
      qc.invalidateQueries({ queryKey: ["finding", "today"] });
      qc.invalidateQueries({ queryKey: ["findings"] });
    },
  });

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPending({ file, preview: URL.createObjectURL(file) });
  }

  const done = !!todayFinding;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink paper-grid relative overflow-hidden">
      <img
        src={cloverBg.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 w-72 opacity-30 rotate-12 select-none"
      />
      <main className="flex-1 flex flex-col items-center justify-center px-5 pt-8 pb-28 relative">
        <section className="w-full max-w-[19rem]">

          <div className="text-center mb-4">
            <h2 className="font-display text-4xl leading-none">
              {done ? "Today's find" : "Today's Quest"}
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1.5">
              {formatDate(today)} · {quest.category}
            </p>
          </div>

          <div className="relative">
            <img
              src={cloverTape.url}
              alt=""
              aria-hidden
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-36 -rotate-3 z-10 pointer-events-none select-none drop-shadow-sm"
            />

            <article className="bg-pink rounded-2xl p-6 pt-8 shadow-[0_14px_36px_-18px_rgba(13,61,20,0.35)] ring-1 ring-forest/15">
              {done && todayFinding ? (
                <>
                  <div className="bg-white p-2 pb-4 -rotate-2 shadow-md ring-1 ring-forest/10">
                    {todayFinding.photo_url ? (
                      <img
                        src={todayFinding.photo_url}
                        alt={todayFinding.quest_title}
                        className="w-full aspect-square object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-paper" />
                    )}
                  </div>
                  <p className="font-display text-lg text-center mt-4 text-balance leading-tight">
                    {todayFinding.quest_title}
                  </p>
                  {todayFinding.caption && (
                    <p className="text-sm text-ink/70 text-center mt-1 italic">
                      "{todayFinding.caption}"
                    </p>
                  )}
                  <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-forest/60">
                    ✓ Logged for today
                  </p>
                </>
              ) : pending ? (
                <>
                  <div className="bg-white p-2 pb-4 -rotate-1 shadow-md ring-1 ring-forest/10">
                    <img src={pending.preview} alt="" className="w-full aspect-square object-cover" />
                  </div>
                  <input
                    type="text"
                    placeholder="a little caption (optional)"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full mt-4 px-3 py-2 rounded-xl bg-paper/80 ring-1 ring-forest/15 text-sm outline-none focus:ring-forest/40"
                  />
                  {save.error && (
                    <p className="text-xs text-red-700 mt-2">
                      {(save.error as Error).message}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={save.isPending}
                    onClick={() => save.mutate()}
                    className="w-full mt-3 bg-forest text-paper py-3 rounded-xl font-display text-lg disabled:opacity-60"
                  >
                    {save.isPending ? "Saving…" : "Check it off"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(pending.preview);
                      setPending(null);
                    }}
                    className="w-full mt-1.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest text-ink/65"
                  >
                    Retake
                  </button>
                </>
              ) : (
                <>
                  <header className="mb-5 text-center">
                    <h1 className="font-display text-[1.65rem] leading-tight text-balance">
                      {quest.title}
                    </h1>
                    <p className="text-sm text-ink/75 mt-2.5 max-w-[24ch] mx-auto">
                      {quest.hint}
                    </p>
                  </header>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={onPick}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full bg-forest text-paper py-3 rounded-xl font-display text-lg shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)] hover:bg-forest/90 active:scale-[0.98] transition-all"
                  >
                    Complete!
                  </button>
                </>
              )}
            </article>
          </div>

          <p className="text-center mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-forest/50">
            streak of luck · {streak}
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
