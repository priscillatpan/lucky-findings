import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { getGateSessionConfig, isLockedOut, passwordMatches, type GateSession } from "./gate.server";

export const isUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  if (!process.env.SITE_PASSWORD) return { unlocked: true as const };
  const session = await useSession<GateSession>(getGateSessionConfig());
  if (isLockedOut(session.data)) return { unlocked: false as const, locked: true as const };
  return { unlocked: !!session.data.unlocked };
});

export const unlockSite = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => ({
    password: String(data?.password ?? "").slice(0, 200),
  }))
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSWORD;
    if (!expected) return { ok: true as const };

    const session = await useSession<GateSession>(getGateSessionConfig());
    if (isLockedOut(session.data)) {
      return { ok: false as const, locked: true as const };
    }

    const attempts = (session.data.failedAttempts || 0) + 1;

    if (!passwordMatches(data.password, expected)) {
      if (attempts >= 8) {
        await session.update({ failedAttempts: attempts, lockedUntil: Date.now() + 15 * 60 * 1000 });
      } else {
        await session.update({ failedAttempts: attempts });
      }
      // Slow down guessing attempts
      await new Promise((r) => setTimeout(r, 600));
      return { ok: false as const };
    }

    await session.update({ unlocked: true, failedAttempts: 0, lockedUntil: undefined });
    return { ok: true as const };
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(getGateSessionConfig());
  await session.clear();
  return { ok: true as const };
});
