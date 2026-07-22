import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import cloverLogo from "@/assets/icon_1.png.asset.json";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Lucky Findings" },
      { name: "description", content: "Sign in to Lucky Findings to save your daily quests across devices." },
      { property: "og:title", content: "Sign in — Lucky Findings" },
      { property: "og:description", content: "Sign in to save your daily nature quests." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (mode === "up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setErr(result.error instanceof Error ? result.error.message : "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-[100dvh] bg-paper paper-grid flex items-center justify-center px-5 py-10 text-ink">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={cloverLogo.url} alt="" className="mx-auto size-14 -rotate-6" />
          <h1 className="font-display text-4xl mt-3">Lucky Findings</h1>
          <p className="text-forest/60 text-sm mt-1">A little luck, once a day.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 ring-1 ring-forest/10 shadow-[0_18px_50px_-30px_rgba(13,61,20,0.25)]">
          <button
            type="button"
            onClick={onGoogle}
            className="w-full py-2.5 rounded-xl bg-sky text-ink font-semibold text-sm ring-1 ring-forest/15 hover:brightness-95 transition"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-4 text-[10px] uppercase tracking-widest text-forest/40">
            <div className="h-px flex-1 bg-forest/10" /> or <div className="h-px flex-1 bg-forest/10" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="you@somewhere.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-paper ring-1 ring-forest/15 text-sm outline-none focus:ring-forest/40"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-paper ring-1 ring-forest/15 text-sm outline-none focus:ring-forest/40"
            />
            {err && <p className="text-xs text-red-600">{err}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-forest text-paper py-2.5 rounded-xl font-display text-lg disabled:opacity-60"
            >
              {busy ? "…" : mode === "in" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "in" ? "up" : "in")}
            className="w-full mt-3 text-xs uppercase tracking-widest text-forest/60 hover:text-forest"
          >
            {mode === "in" ? "New here? Create an account" : "Already have one? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
