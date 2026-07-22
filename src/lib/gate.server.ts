import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

export type GateSession = { unlocked?: boolean };

export function gateSessionConfig() {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("SESSION_SECRET is missing or too short");
  }
  return {
    password,
    name: "lucky-gate",
    maxAge: 60 * 60 * 24 * 365,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

export function passwordMatches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function readGateSession() {
  return useSession<GateSession>(gateSessionConfig());
}

export async function requireUnlocked() {
  const session = await readGateSession();
  if (!session.data.unlocked) {
    throw redirect({ to: "/unlock" });
  }
}
