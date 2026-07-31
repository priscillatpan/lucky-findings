import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { getGateSessionConfig, passwordMatches, type GateSession } from "./gate.server";

export const isUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  if (!process.env.SITE_PASSWORD) return { unlocked: true as const };
  const session = await useSession<GateSession>(getGateSessionConfig());
  return { unlocked: !!session.data.unlocked };
});

export const unlockSite = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => ({
    password: String(data?.password ?? "").slice(0, 200),
  }))
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSWORD;
    if (!expected) return { ok: true as const };
    if (!passwordMatches(data.password, expected)) return { ok: false as const };
    const session = await useSession<GateSession>(getGateSessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(getGateSessionConfig());
  await session.clear();
  return { ok: true as const };
});
