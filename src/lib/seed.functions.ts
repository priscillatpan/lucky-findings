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



  // Real uploaded photos in the `findings` bucket under `mock/`.
  const photos = ["mock/p1.jpg", "mock/p2.jpg", "mock/p3.jpg", "mock/p4.png", "mock/p5.jpg", "mock/p6.jpg", "mock/p7.jpg"];

  const rows: Array<{ iso: string; id: string; title: string; category: string; caption: string; photo: string }> = [
    { iso: "2026-07-01", id: "s6", title: "Hunt for a tiny mushroom.", category: "Search", caption: "pin-sized, on a log", photo: photos[5] },
    { iso: "2026-07-02", id: "n6", title: "Find where the light hits weirdest.", category: "Notice", caption: "sunlight over the bridge", photo: "mock/p2.jpg" },
    { iso: "2026-07-03", id: "r6", title: "Find a message meant for no one.", category: "Serendipity", caption: "chalk on the sidewalk: BE NICE", photo: photos[4] },
    { iso: "2026-07-04", id: "e6", title: "Share something small with someone.", category: "Encounter", caption: "gave half my orange away", photo: photos[0] },
    { iso: "2026-07-05", id: "m6", title: "Write a tiny message and leave it somewhere.", category: "Make", caption: "note under a bench: hi :)", photo: "mock/p6.jpg" },
    { iso: "2026-07-06", id: "s1", title: "Look through a patch of clovers.", category: "Search", caption: "three-leaf army, still lucky", photo: photos[3] },
    { iso: "2026-07-07", id: "n1", title: "Find a shape in the clouds.", category: "Notice", caption: "a whale (obviously)", photo: "mock/p3.jpg" },
    { iso: "2026-07-08", id: "r1", title: "Find something someone dropped.", category: "Serendipity", caption: "a single earring, sad little thing", photo: photos[4] },
    { iso: "2026-07-09", id: "e1", title: "Talk to a stranger for one minute.", category: "Encounter", caption: "complimented a dog. success.", photo: photos[0] },
    { iso: "2026-07-10", id: "m1", title: "Build a tiny cairn of stones.", category: "Make", caption: "seven stones, wobbly but standing", photo: "mock/p7.jpg" },
    { iso: "2026-07-11", id: "s2", title: "Find a perfectly round pebble.", category: "Search", caption: "pocket rock, promoted", photo: photos[6] },
    { iso: "2026-07-12", id: "n2", title: "Find the oldest thing you can see.", category: "Notice", caption: "gnarled redwoods, older than me", photo: "mock/p4.png" },
    { iso: "2026-07-13", id: "r2", title: "Follow whichever direction the wind's blowing.", category: "Serendipity", caption: "wind sent me east on the bike path", photo: "mock/p1.jpg" },
    { iso: "2026-07-14", id: "e2", title: "Spot an animal doing its thing.", category: "Encounter", caption: "flock of birds cutting the sky", photo: photos[2] },
    { iso: "2026-07-15", id: "m2", title: "Arrange found objects into a pattern.", category: "Make", caption: "stones stacked into a little tower", photo: photos[6] },
    { iso: "2026-07-16", id: "s3", title: "Spot something bright red outdoors.", category: "Search", caption: "stop-sign red on a mailbox", photo: photos[5] },
    { iso: "2026-07-17", id: "n3", title: "Notice one sound you usually tune out.", category: "Notice", caption: "waves rustling through beach grass", photo: "mock/p5.jpg" },
    { iso: "2026-07-18", id: "r3", title: "Turn left every time you'd normally go right.", category: "Serendipity", caption: "ended up at a bakery", photo: photos[1] },
    { iso: "2026-07-19", id: "e3", title: "Wave at someone unexpectedly.", category: "Encounter", caption: "kid waved back with both hands", photo: photos[3] },
    { iso: "2026-07-20", id: "m3", title: "Draw something using only what's around.", category: "Make", caption: "stick doodle in the dirt", photo: photos[5] },
    { iso: "2026-07-21", id: "s4", title: "Find a heart-shaped anything.", category: "Search", caption: "leaf shaped like it meant it", photo: photos[2] },
  ];

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
