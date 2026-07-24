import { createServerFn } from "@tanstack/react-start";

// One-shot mock seed for the calendar/video demo.
// Idempotent: skips days that already have a finding.
export const seedJulyMockFn = createServerFn({ method: "POST" }).handler(async () => {
  const { ownerId, getAdmin } = await import("./findings.server");
  const admin = await getAdmin();
  const owner = ownerId();

  // Ensure the owner exists in auth.users (findings.user_id has a FK to it).
  try {
    await admin.auth.admin.createUser({
      id: owner,
      email: `owner-${owner.slice(0, 8)}@lucky-findings.local`,
      email_confirm: true,
      user_metadata: { role: "shared-owner" },
    });
  } catch {
    // ignore — already exists
  }



  // Each real photo used on exactly one day. Other July days stay empty
  // until the user uploads more (via the app's camera flow, or more chat uploads).
  const rows = [
    { iso: "2026-07-02", id: "n6", title: "Find where the light hits weirdest.", category: "Notice", caption: "sunlight over the bridge", photo: "mock/p2.jpg" },
    { iso: "2026-07-05", id: "m6", title: "Write a tiny message and leave it somewhere.", category: "Make", caption: "note under a bench: hi :)", photo: "mock/p6.jpg" },
    { iso: "2026-07-07", id: "n1", title: "Find a shape in the clouds.", category: "Notice", caption: "a whale (obviously)", photo: "mock/p3.jpg" },
    { iso: "2026-07-10", id: "m1", title: "Build a tiny cairn of stones.", category: "Make", caption: "seven stones, wobbly but standing", photo: "mock/p7.jpg" },
    { iso: "2026-07-12", id: "n2", title: "Find the oldest thing you can see.", category: "Notice", caption: "gnarled redwoods, older than me", photo: "mock/p4.png" },
    { iso: "2026-07-13", id: "r2", title: "Follow whichever direction the wind's blowing.", category: "Serendipity", caption: "wind sent me east on the bike path", photo: "mock/p1.jpg" },
    { iso: "2026-07-17", id: "n3", title: "Notice one sound you usually tune out.", category: "Notice", caption: "waves rustling through beach grass", photo: "mock/p5.jpg" },
  ];

  const keepDates = rows.map((r) => r.iso);
  await admin
    .from("findings")
    .delete()
    .eq("user_id", owner)
    .gte("completed_on", "2026-07-01")
    .lte("completed_on", "2026-07-31")
    .not("completed_on", "in", `(${keepDates.map((d) => `"${d}"`).join(",")})`);

  const payload = rows.map((r) => ({
    user_id: owner,
    quest_id: r.id,
    quest_title: r.title,
    quest_category: r.category,
    photo_path: r.photo,
    caption: r.caption,
    completed_on: r.iso,
  }));

  const { error, data } = await admin
    .from("findings")
    .upsert(payload, { onConflict: "user_id,completed_on" })
    .select("completed_on");
  if (error) throw error;
  return { updated: data?.length ?? 0 };
});
