import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import cloverLogo from "@/assets/icon_1.png.asset.json";
import cloverBg from "@/assets/background.png.asset.json";
import { unlockSite, checkUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { unlocked } = await checkUnlocked();
      if (unlocked) {
        const { redirect } = await import("@tanstack/react-router");
        throw redirect({ to: "/" });
      }
    } catch (e) {
      const { isRedirect } = await import("@tanstack/react-router");
      if (isRedirect(e)) throw e;
    }
  },
  head: () => ({
    meta: [
      { title: "Unlock — Lucky Findings" },
      { name: "description", content: "A tiny password gate for a private field journal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnlockPage,
});

function UnlockPage() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const { ok } = await unlock({ data: { password } });
      if (ok) {
        await router.navigate({ to: "/" });
      } else {
        setError(true);
        setBusy(false);
      }
    } catch {
      setError(true);
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-paper paper-grid flex items-center justify-center px-5 py-10 text-ink relative overflow-hidden">
      <img
        src={cloverBg.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 w-72 opacity-30 rotate-12 select-none"
      />
      <form onSubmit={onSubmit} className="w-full max-w-[19rem] relative">
        <div className="text-center mb-6">
          <img src={cloverLogo.url} alt="" className="mx-auto size-14 -rotate-6 object-contain mb-3" />
          <h1 className="font-display text-4xl leading-none">Lucky Findings</h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-2">
            a little luck, once a day
          </p>
        </div>
        <div className="bg-pink rounded-2xl p-6 shadow-[0_14px_36px_-18px_rgba(13,61,20,0.35)] ring-1 ring-forest/15">
          <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70 mb-2">
            Password
          </label>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-paper/90 ring-1 ring-forest/15 text-base outline-none focus:ring-forest/50"
          />
          {error && (
            <p className="text-xs text-red-800 mt-2">Nope — try again.</p>
          )}
          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="w-full mt-4 bg-forest text-paper py-3 rounded-xl font-display text-lg disabled:opacity-60"
          >
            {busy ? "Unlocking…" : "Unlock"}
          </button>
        </div>
      </form>
    </div>
  );
}
