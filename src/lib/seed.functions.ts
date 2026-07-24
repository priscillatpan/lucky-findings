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
    { iso: "2026-07-21", id: "n8", title: "Notice one color that keeps repeating.", category: "Notice", caption: "turquoise everywhere today", photo: "mock/p12.jpg" },
    { iso: "2026-07-02", id: "n6", title: "Find where the light hits weirdest.", category: "Notice", caption: "sunlight over the bridge", photo: "mock/p2.jpg" },
    { iso: "2026-07-03", id: "s1", title: "Look through a patch of clovers.", category: "Search", caption: "FOUR LEAVES!! today feels lucky", photo: "mock/p11.jpg" },
    { iso: "2026-07-04", id: "n9", title: "Watch the sky until the sun goes down.", category: "Notice", caption: "two gulls at golden hour", photo: "mock/p13.jpg" },
    { iso: "2026-07-05", id: "m6", title: "Write a tiny message and leave it somewhere.", category: "Make", caption: "note under a bench: hi :)", photo: "mock/p6.jpg" },
    { iso: "2026-07-06", id: "s5", title: "Find something growing where it shouldn't.", category: "Search", caption: "moss in the sidewalk cracks", photo: "mock/p14.jpg" },
    { iso: "2026-07-07", id: "n1", title: "Find a shape in the clouds.", category: "Notice", caption: "a whale (obviously)", photo: "mock/p3.jpg" },
    { iso: "2026-07-08", id: "n5", title: "Spot the smallest living thing nearby.", category: "Notice", caption: "coral dahlia the size of my hand", photo: "mock/p8.jpg" },
    { iso: "2026-07-09", id: "e1", title: "Cross paths with a wild animal.", category: "Encounter", caption: "seal!! kept a respectful distance", photo: "mock/p15.jpg" },
    { iso: "2026-07-10", id: "m1", title: "Build a tiny cairn of stones.", category: "Make", caption: "seven stones, wobbly but standing", photo: "mock/p7.jpg" },
    { iso: "2026-07-11", id: "s6", title: "Spot something the exact color pink.", category: "Search", caption: "wild buckwheat, dusty pink", photo: "mock/p16.jpg" },
    { iso: "2026-07-12", id: "n2", title: "Find the oldest thing you can see.", category: "Notice", caption: "gnarled redwoods, older than me", photo: "mock/p4.png" },
    { iso: "2026-07-13", id: "r2", title: "Follow whichever direction the wind's blowing.", category: "Serendipity", caption: "wind sent me east on the bike path", photo: "mock/p1.jpg" },
    { iso: "2026-07-14", id: "s3", title: "Spot something bright red outdoors.", category: "Search", caption: "sidewalk ranunculus, every color", photo: "mock/p9.jpg" },
    { iso: "2026-07-15", id: "r6", title: "Go somewhere you've never been before.", category: "Serendipity", caption: "foggy ridge trail, first time here", photo: "mock/p17.jpg" },
    { iso: "2026-07-16", id: "n10", title: "Notice the weather change while you're in it.", category: "Notice", caption: "the fog rolled all the way in", photo: "mock/p18.jpg" },
    { iso: "2026-07-17", id: "n3", title: "Notice one sound you usually tune out.", category: "Notice", caption: "waves rustling through beach grass", photo: "mock/p5.jpg" },
    { iso: "2026-07-18", id: "s7", title: "Find something washed ashore.", category: "Search", caption: "two tiny starfish!!", photo: "mock/p19.jpg" },
    { iso: "2026-07-19", id: "r5", title: "Take the long way somewhere.", category: "Serendipity", caption: "jumped for joy by the han river", photo: "mock/p10.jpg" },
    { iso: "2026-07-20", id: "m7", title: "Make land art with whatever's around you.", category: "Make", caption: "someone left a stone spiral", photo: "mock/p20.jpg" },
  ];

  const keepDates = rows.map((r) => r.iso);
  await admin
    .from("findings")
    .delete()
    .eq("user_id", owner)
    .gte("completed_on", "2026-07-01")
    .lte("completed_on", "2026-07-31")
    .like("photo_path", "mock/%")
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
