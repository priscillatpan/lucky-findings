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



  const rows = [
    { iso: "2026-07-01", id: "s6", title: "Hunt for a tiny mushroom.", category: "Search", caption: "pin-sized, on a log" },
    { iso: "2026-07-02", id: "n6", title: "Find where the light hits weirdest.", category: "Notice", caption: "sunlight through a bottle" },
    { iso: "2026-07-03", id: "r6", title: "Find a message meant for no one.", category: "Serendipity", caption: "chalk on the sidewalk: BE NICE" },
    { iso: "2026-07-04", id: "e6", title: "Share something small with someone.", category: "Encounter", caption: "gave half my orange away" },
    { iso: "2026-07-05", id: "m6", title: "Write a tiny message and leave it somewhere.", category: "Make", caption: "note under a bench: hi :)" },
    { iso: "2026-07-06", id: "s1", title: "Look through a patch of clovers.", category: "Search", caption: "three-leaf army, still lucky" },
    { iso: "2026-07-07", id: "n1", title: "Find a shape in the clouds.", category: "Notice", caption: "a whale (obviously)" },
    { iso: "2026-07-08", id: "r1", title: "Find something someone dropped.", category: "Serendipity", caption: "a single earring, sad little thing" },
    { iso: "2026-07-09", id: "e1", title: "Talk to a stranger for one minute.", category: "Encounter", caption: "complimented a dog. success." },
    { iso: "2026-07-10", id: "m1", title: "Build a tiny cairn of stones.", category: "Make", caption: "seven stones, wobbly but standing" },
    { iso: "2026-07-11", id: "s2", title: "Find a perfectly round pebble.", category: "Search", caption: "pocket rock, promoted" },
    { iso: "2026-07-12", id: "n2", title: "Find the oldest thing you can see.", category: "Notice", caption: "gnarled oak, older than me" },
    { iso: "2026-07-13", id: "r2", title: "Follow whichever direction the wind's blowing.", category: "Serendipity", caption: "wind sent me east" },
    { iso: "2026-07-14", id: "e2", title: "Spot an animal doing its thing.", category: "Encounter", caption: "squirrel eating half a bagel" },
    { iso: "2026-07-15", id: "m2", title: "Arrange found objects into a pattern.", category: "Make", caption: "acorns in a spiral" },
    { iso: "2026-07-16", id: "s3", title: "Spot something bright red outdoors.", category: "Search", caption: "stop-sign red on a mailbox" },
    { iso: "2026-07-17", id: "n3", title: "Notice one sound you usually tune out.", category: "Notice", caption: "a distant train, kind of nice" },
    { iso: "2026-07-18", id: "r3", title: "Turn left every time you'd normally go right.", category: "Serendipity", caption: "ended up at a bakery" },
    { iso: "2026-07-19", id: "e3", title: "Wave at someone unexpectedly.", category: "Encounter", caption: "kid waved back with both hands" },
    { iso: "2026-07-20", id: "m3", title: "Draw something using only what's around.", category: "Make", caption: "stick doodle in the dirt" },
    { iso: "2026-07-21", id: "s4", title: "Find a heart-shaped anything.", category: "Search", caption: "leaf shaped like it meant it" },
  ];

  const owner = ownerId();
  const payload = rows.map((r) => ({
    user_id: owner,
    quest_id: r.id,
    quest_title: r.title,
    quest_category: r.category,
    photo_path: `mock/${r.iso}.jpg`,
    caption: r.caption,
    completed_on: r.iso,
  }));

  const { error, data } = await admin
    .from("findings")
    .upsert(payload, { onConflict: "user_id,completed_on", ignoreDuplicates: true })
    .select("completed_on");
  if (error) throw error;
  return { inserted: data?.length ?? 0 };
});
