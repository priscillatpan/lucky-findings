import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import cloverIcon from "@/assets/icon_2.png.asset.json";
import { unlockSite } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Locked — Lucky Findings" },
      { name: "description", content: "This little field journal is private for now. Enter the password to peek inside." },
      { property: "og:title", content: "Locked — Lucky Findings" },
      { property: "og:description", content: "This little field journal is private for now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const { ok } = await unlock({ data: { password } });
    setBusy(false);
    if (ok) {
      await router.invalidate();
      await router.navigate({ to: "/" });
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-paper text-ink paper-grid px-6">
      <img src={cloverIcon.url} alt="" aria-hidden className="size-10 -rotate-6 object-contain mb-3 opacity-90" />
      <h1 className="font-display text-3xl">Lucky Findings</h1>
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1">coming soon</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/40 mt-0.5">private beta</p>

      <form onSubmit={onSubmit} className="w-full max-w-[16rem] mt-6">
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="password"
          style={{ fontSize: "16px" }}
          className="w-full px-3 py-2 rounded-xl bg-card ring-1 ring-forest/25 outline-none focus:ring-forest/50 text-center"
        />
        {error && <p className="text-[11px] text-red-700 text-center mt-2">Not quite — try again</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full mt-3 bg-forest text-paper py-2 rounded-xl font-display text-base disabled:opacity-60 shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)]"
        >
          {busy ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
