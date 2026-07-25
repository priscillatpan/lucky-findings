import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/lucky/Nav";
import cloverTape from "@/assets/tape_3_v2.png.asset.json";
import cloverBg from "@/assets/background.png.asset.json";
import cloverIcon from "@/assets/icon_2.png.asset.json";
import { isoDate, questForDate } from "@/data/quests";
import { deleteFindingForDate, getFindingForDate, listFindings, saveFinding } from "@/lib/findings";
import { CloverConfetti } from "@/components/lucky/CloverConfetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today's Quest — Lucky Findings" },
      { name: "description", content: "Your daily nature quest — one tiny prompt, one snapped photo, a growing field journal of small lucky findings." },
      { property: "og:title", content: "Today's Quest — Lucky Findings" },
      { property: "og:description", content: "A daily nature quest journal. One tiny prompt, one snapped photo, a growing collection of lucky findings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}

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

function categoryBorderClass(cat: string) {
  switch (cat) {
    case "Search": return "border-l-lime";
    case "Notice": return "border-l-sky";
    case "Serendipity": return "border-l-pink";
    case "Encounter": return "border-l-butter";
    case "Make": return "border-l-forest";
    default: return "border-l-forest";
  }
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
  const todayKey = isoDate(today);
  const realQuest = questForDate(today);
  const qc = useQueryClient();

  const { data: todayFinding } = useQuery({
    queryKey: ["finding", todayKey],
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
  const [celebrate, setCelebrate] = useState(false);
  const done = !!todayFinding;

  const quest = realQuest;

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
    onSuccess: (finding) => {
      qc.setQueryData(["finding", todayKey], finding);
      setPending(null);
      setCaption("");
      qc.invalidateQueries({ queryKey: ["finding", todayKey] });
      qc.invalidateQueries({ queryKey: ["findings"] });
      setCelebrate(true);
      if (typeof window !== "undefined") {
        window.setTimeout(() => setCelebrate(false), 3200);
      }
    },
    onError: (err) => {
      console.error("saveFinding failed", err);
      if (typeof window !== "undefined") {
        window.alert(`Couldn't save: ${(err as Error).message}`);
      }
    },
  });

  const undo = useMutation({
    mutationFn: () => deleteFindingForDate(today),
    onSuccess: () => {
      qc.setQueryData(["finding", todayKey], null);
      setCelebrate(false);
      qc.invalidateQueries({ queryKey: ["finding", todayKey] });
      qc.invalidateQueries({ queryKey: ["findings"] });
    },
    onError: (err) => {
      console.error("undo failed", err);
      if (typeof window !== "undefined") {
        window.alert(`Couldn't undo: ${(err as Error).message}`);
      }
    },
  });

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPending({ file, preview: URL.createObjectURL(file) });
  }


  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink paper-grid relative overflow-hidden">
      {celebrate && <CloverConfetti />}
      <img
        src={cloverBg.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 w-72 opacity-30 rotate-12 select-none"
      />
      <header className="relative z-10 pt-5 px-5 flex items-center justify-center gap-1.5">
        <img src={cloverIcon.url} alt="" aria-hidden className="size-4 -rotate-6 object-contain opacity-90" />
        <span className="font-display text-sm tracking-tight text-forest/80">Lucky Findings</span>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-5 pt-2 pb-24 relative">

        <section className="w-full max-w-[18rem]">

          <div className="text-center mb-1">
            <img
              src={cloverIcon.url}
              alt=""
              aria-hidden
              className="size-6 mx-auto mb-1.5 -rotate-6 object-contain opacity-90"
            />
            <h2 className="font-display text-2xl leading-none">
              {done ? "Today's find" : "Today's Quest"}
            </h2>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1">
              {formatDate(today)}
            </p>

          </div>

          <div className="relative mt-5">
            <img
              src={cloverTape.url}
              alt=""
              aria-hidden
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 -rotate-3 z-10 pointer-events-none select-none drop-shadow-sm saturate-[65%] brightness-105"
            />


            <article className={`bg-card rounded-2xl p-4 pt-7 min-h-[10rem] shadow-[0_14px_36px_-18px_rgba(13,61,20,0.35)] ring-1 ring-forest/20 border-2 border-forest/30 border-l-4 ${categoryBorderClass(quest.category)} relative flex flex-col justify-center`}>
              <span className="absolute top-2.5 right-3 flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.2em] text-forest/70">
                <span className={"size-2 rounded-full ring-1 ring-forest/30 " + categoryDotClass(quest.category)} />
                {quest.category}
              </span>
              {done && todayFinding ? (
                <>
                  <div className="bg-card p-1.5 pb-2.5 -rotate-2 shadow-md ring-1 ring-forest/10">
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
                  <p className="font-display text-sm text-center mt-2.5 text-balance leading-tight">
                    {todayFinding.quest_title}
                  </p>
                  {todayFinding.caption && (
                    <p className="text-[11px] text-ink/70 text-center mt-1 italic">
                      "{todayFinding.caption}"
                    </p>
                  )}
                  <div className="mt-2 flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-1.5 rounded-full bg-lime/70 ring-1 ring-forest/40 px-3 py-1 animate-scale-in">
                      <span className="font-display text-xs text-ink">Lucky find logged!</span>
                      <span className="text-sm">🍀</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== "undefined" && !window.confirm("Reupload today's find?")) return;
                        undo.mutate();
                      }}
                      disabled={undo.isPending}
                      className="text-[10px] font-semibold uppercase tracking-widest text-forest/70 underline underline-offset-4 decoration-forest/30 hover:text-forest disabled:opacity-50"
                    >
                      {undo.isPending ? "Reuploading…" : "reupload"}
                    </button>
                  </div>
                </>
              ) : pending ? (
                <>
                  <div className="bg-card p-1.5 pb-2.5 -rotate-1 shadow-md ring-1 ring-forest/10">
                    <img src={pending.preview} alt="" className="w-full aspect-square object-cover" />
                  </div>
                  <input
                    type="text"
                    placeholder="a little caption (optional)"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full mt-2.5 px-3 py-2 rounded-xl bg-paper/80 ring-1 ring-forest/15 text-xs outline-none focus:ring-forest/40"
                  />
                  {save.error && (
                    <p className="text-xs text-red-700 mt-2">
                      {(save.error as Error).message}
                    </p>
                  )}
                </>
              ) : (
                <header className="text-center pt-1 pb-1 flex-1 flex flex-col justify-center">
                  <h1 className="font-display text-lg leading-tight text-balance">
                    {quest.title}
                  </h1>
                  <p className="text-[11px] text-ink/75 mt-1.5 max-w-[24ch] mx-auto">
                    {quest.hint}
                  </p>
                </header>
              )}
            </article>
          </div>

          {!done && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPick}
              />
              {pending ? (
                <>
                  <button
                    type="button"
                    disabled={save.isPending}
                    onClick={() => save.mutate()}
                    className="w-full mt-3 bg-forest text-paper py-2 rounded-xl font-display text-base disabled:opacity-60 shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)]"
                  >
                    {save.isPending ? "Saving…" : "Check it off"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(pending.preview);
                      setPending(null);
                    }}
                    className="w-full mt-1 py-1.5 rounded-xl text-[10px] font-semibold uppercase tracking-widest text-ink/65"
                  >
                    Retake
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full mt-3 bg-forest text-paper py-2 rounded-xl font-display text-base shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)] hover:bg-forest/90 active:scale-[0.98] transition-all"
                >
                  Complete!
                </button>
              )}
            </>
          )}

          <p className="text-center mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/50">
            takes 5 minutes · streak {streak}
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
