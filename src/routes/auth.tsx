import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkInviteFn } from "@/lib/auth.functions";
import cloverIcon from "@/assets/icon_2.png.asset.json";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Lucky Findings" },
      { name: "description", content: "Sign in to your Lucky Findings field journal with a one-time code." },
      { property: "og:title", content: "Sign in — Lucky Findings" },
      { property: "og:description", content: "Sign in to your Lucky Findings field journal with a one-time code." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Step = "email" | "code";

function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Magic-link return or an already-signed-in visitor lands straight in the app.
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        router.navigate({ to: "/today", replace: true });
        return;
      }
      setCheckingSession(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        router.navigate({ to: "/today", replace: true });
      }
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  async function sendCode(target: string) {
    const { allowed } = await checkInviteFn({ data: { email: target } });
    if (!allowed) {
      setError("That email isn't on the list yet — join the waitlist and we'll be in touch 🍀");
      return false;
    }
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: target,
      options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/auth` },
    });
    if (otpError) {
      setError(otpError.message);
      return false;
    }
    return true;
  }

  async function onEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const target = email.trim().toLowerCase();
      if (await sendCode(target)) {
        setEmail(target);
        setStep("code");
        setNotice("Check your email — tap the link, or paste the code below.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const token = code.replace(/\D/g, "");
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    setBusy(false);
    if (verifyError) {
      setError("That code didn't work — check it or send a new one.");
      return;
    }
    await router.invalidate();
    router.navigate({ to: "/today", replace: true });
  }

  async function onResend() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (await sendCode(email)) setNotice("Sent again — check your inbox.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-paper text-ink paper-grid px-6">
      <img src={cloverIcon.url} alt="" aria-hidden className="size-10 -rotate-6 object-contain mb-3 opacity-90" />
      <h1 className="font-display text-3xl text-forest">Lucky Findings</h1>
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-forest/60 mt-1">private beta</p>

      {checkingSession ? (
        <p className="text-sm text-ink/50 mt-8">One sec…</p>
      ) : step === "email" ? (
        <form onSubmit={onEmailSubmit} className="w-full max-w-[17rem] mt-7">
          <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.2em] text-forest/60 text-center mb-2">
            your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ fontSize: "16px" }}
            className="w-full px-3 py-2 rounded-xl bg-card ring-1 ring-forest/25 outline-none focus:ring-forest/50 text-center"
          />
          {error && <p className="text-[11px] text-red-700 text-center mt-2">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full mt-3 bg-forest text-paper py-2 rounded-xl font-display text-base disabled:opacity-60 shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)]"
          >
            {busy ? "Sending…" : "Send me a code"}
          </button>
        </form>
      ) : (
        <form onSubmit={onCodeSubmit} className="w-full max-w-[17rem] mt-7">
          <label htmlFor="code" className="block text-[11px] uppercase tracking-[0.2em] text-forest/60 text-center mb-2">
            6-digit code
          </label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            maxLength={8}
            style={{ fontSize: "18px", letterSpacing: "0.3em" }}
            className="w-full px-3 py-2 rounded-xl bg-card ring-1 ring-forest/25 outline-none focus:ring-forest/50 text-center font-medium"
          />
          {notice && !error && <p className="text-[11px] text-ink/60 text-center mt-2">{notice}</p>}
          {error && <p className="text-[11px] text-red-700 text-center mt-2">{error}</p>}
          <button
            type="submit"
            disabled={busy || code.replace(/\D/g, "").length < 6}
            className="w-full mt-3 bg-forest text-paper py-2 rounded-xl font-display text-base disabled:opacity-60 shadow-[0_8px_20px_-8px_rgba(13,102,34,0.5)]"
          >
            {busy ? "Checking…" : "Enter"}
          </button>
          <div className="flex justify-between mt-3 text-[11px] text-forest/60">
            <button type="button" onClick={() => { setStep("email"); setCode(""); setError(null); }} className="hover:text-forest">
              use another email
            </button>
            <button type="button" onClick={onResend} disabled={busy} className="hover:text-forest disabled:opacity-50">
              resend
            </button>
          </div>
        </form>
      )}

      <p className="text-[11px] text-ink/45 mt-8 text-center max-w-[17rem]">
        Lucky Findings is invite-only for now. Not on the list?{" "}
        <a href="/" className="underline decoration-lime decoration-2 underline-offset-2 hover:text-forest">
          Join the waitlist
        </a>
        .
      </p>
    </div>
  );
}
