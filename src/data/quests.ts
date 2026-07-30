export type QuestCategory = "Search" | "Notice" | "Serendipity" | "Encounter" | "Make";

export type Quest = {
  id: string;
  category: QuestCategory;
  title: string;
  hint: string;
};

// 30 quests, 6 per category. Rotates by day so the category cycles daily
// and a new quest within the category shows every 5 days.
export const QUESTS: Quest[] = [
  // Search — find something rare among common things
  { id: "s1", category: "Search", title: "Look through a patch of clovers.", hint: "Bonus luck if you spot a four-leaf." },
  { id: "s2", category: "Search", title: "Find a perfectly round pebble.", hint: "The rounder, the luckier." },
  { id: "s3", category: "Search", title: "Spot something bright red outdoors.", hint: "A berry, a door, a mitten." },
  { id: "s4", category: "Search", title: "Find a heart-shaped anything.", hint: "Leaves, stones, spilled coffee." },
  { id: "s5", category: "Search", title: "Look for a feather on the ground.", hint: "Any color counts." },
  { id: "s6", category: "Search", title: "Hunt for a tiny mushroom.", hint: "Under logs, in the grass." },

  // Notice — small acts of paying attention
  { id: "n1", category: "Notice", title: "Find a shape in the clouds.", hint: "Look up for one full minute." },
  { id: "n2", category: "Notice", title: "Find the oldest thing you can see.", hint: "A tree, a rock, a building." },
  { id: "n3", category: "Notice", title: "Notice one sound you usually tune out.", hint: "Then chase where it came from." },
  { id: "n4", category: "Notice", title: "Find a leaf with two colors.", hint: "Green fading to yellow, red tips, or a brown edge." },
  { id: "n5", category: "Notice", title: "Spot the smallest living thing nearby.", hint: "An ant, a moss, a bud." },
  { id: "n6", category: "Notice", title: "Find where the light hits weirdest.", hint: "A reflection, a glow, a stripe." },

  // Serendipity — luck-of-the-draw discoveries
  { id: "r1", category: "Serendipity", title: "Find something someone dropped.", hint: "A coin, a mitten, small serendipity." },
  { id: "r2", category: "Serendipity", title: "Follow whichever direction the wind's blowing.", hint: "See where it takes you." },
  { id: "r3", category: "Serendipity", title: "Turn left every time you'd normally go right.", hint: "For 10 minutes at least." },
  { id: "r4", category: "Serendipity", title: "Pick up the first interesting object you see.", hint: "Keep it or leave it." },
  { id: "r5", category: "Serendipity", title: "Take the long way somewhere.", hint: "One street you've never walked." },
  { id: "r6", category: "Serendipity", title: "Find a message meant for no one.", hint: "Sidewalk chalk, a sticker, a note." },

  // Encounter — small human/creature contact
  { id: "e1", category: "Encounter", title: "Say hi to someone (or something) alive.", hint: "A stranger, a dog, a very good tree." },
  { id: "e2", category: "Encounter", title: "Spot an animal doing its thing.", hint: "A squirrel, a bird, a cat on a fence." },
  { id: "e3", category: "Encounter", title: "Wave at someone unexpectedly.", hint: "Bonus if they wave back." },
  { id: "e4", category: "Encounter", title: "Find a bug worth watching.", hint: "Follow it for a whole minute." },
  { id: "e5", category: "Encounter", title: "Find a spot you'd recommend to someone.", hint: "Ask a local, or just pick your own." },
  { id: "e6", category: "Encounter", title: "Share something small with someone.", hint: "A snack, a seat, a smile." },

  // Make — tiny creative acts
  { id: "m1", category: "Make", title: "Build a tiny cairn of stones.", hint: "Three stones minimum." },
  { id: "m2", category: "Make", title: "Arrange found objects into a pattern.", hint: "Leaves, pebbles, whatever." },
  { id: "m3", category: "Make", title: "Draw something using only what's around.", hint: "Stick in dirt, chalk on stone." },
  { id: "m4", category: "Make", title: "Press a leaf between two rocks.", hint: "Bring it home flat." },
  { id: "m5", category: "Make", title: "Make a nest out of found things.", hint: "For the smallest creature you can imagine." },
  { id: "m6", category: "Make", title: "Write a tiny message and leave it somewhere.", hint: "For a stranger to find." },
];

// Days since a fixed epoch so the same day always resolves to the same quest.
export function dayIndex(date: Date = new Date()): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc / 86_400_000);
}

const CATEGORY_ORDER: QuestCategory[] = ["Search", "Notice", "Serendipity", "Encounter", "Make"];

function pickInCategory(category: QuestCategory, idx: number): Quest {
  const inCategory = QUESTS.filter((q) => q.category === category);
  return inCategory[Math.floor(idx / CATEGORY_ORDER.length) % inCategory.length];
}

export function questForDate(date: Date = new Date()): Quest {
  // Cycle through categories daily, and rotate quest within each category.
  const idx = dayIndex(date);
  return pickInCategory(CATEGORY_ORDER[idx % CATEGORY_ORDER.length], idx);
}

// Today's quest plus two backups from other categories, so there's always
// something doable (e.g. if nobody's around for an Encounter quest).
export function questsForDate(date: Date = new Date()): Quest[] {
  const idx = dayIndex(date);
  const start = idx % CATEGORY_ORDER.length;
  const out: Quest[] = [];
  for (let i = 0; i < CATEGORY_ORDER.length && out.length < 3; i++) {
    const category = CATEGORY_ORDER[(start + i) % CATEGORY_ORDER.length];
    const q = pickInCategory(category, idx + i);
    if (!out.some((x) => x.id === q.id)) out.push(q);
  }
  return out;
}

export function isoDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
