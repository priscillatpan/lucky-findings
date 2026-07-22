import { createServerFn } from "@tanstack/react-start";

export const unlockSite = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => {
    if (typeof data?.password !== "string" || data.password.length > 200) {
      throw new Error("Invalid input");
    }
    return { password: data.password };
  })
  .handler(async ({ data }) => {
    const { passwordMatches, readGateSession } = await import("./gate.server");
    const expected = process.env.SITE_PASSWORD;
    if (!expected) throw new Error("SITE_PASSWORD is not set");
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }
    const session = await readGateSession();
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const { readGateSession } = await import("./gate.server");
  const session = await readGateSession();
  await session.clear();
  return { ok: true as const };
});

export const checkUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  const { readGateSession } = await import("./gate.server");
  const session = await readGateSession();
  return { unlocked: !!session.data.unlocked };
});
