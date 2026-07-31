import { createHash, timingSafeEqual } from "node:crypto";
import type { SessionConfig } from "@tanstack/start-server-core";

export type GateSession = { unlocked?: boolean };

export function getGateSessionConfig(): SessionConfig {
  const password = process.env.SESSION_SECRET;
  if (!password) throw new Error("SESSION_SECRET is not set");

  return {
    password,
    name: "lucky-gate",
    maxAge: 60 * 60 * 24 * 30,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
      path: "/",
    } as SessionConfig["cookie"],
  };
}

export function passwordMatches(input: string, expected: string): boolean {
  const inputHash = createHash("sha256").update(input, "utf8").digest();
  const expectedHash = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(inputHash, expectedHash);
}