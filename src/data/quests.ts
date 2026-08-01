export type QuestCategory = "Search" | "Notice" | "Serendipity" | "Encounter" | "Make";

export type Quest = {
  id: string;
  category: QuestCategory;
  title: string;
  hint: string;
};

// A big pool of quests (40 per category, 200 total) so the rotation runs for
// months without repeating. Interleaved by category below.
export const QUESTS: Quest[] = [
  // Search — find something rare among common things
  { id: "s1", category: "Search", title: "Look through a patch of clovers.", hint: "Bonus luck if you spot a four-leaf." },
  { id: "s2", category: "Search", title: "Find a perfectly round pebble.", hint: "The rounder, the luckier." },
  { id: "s3", category: "Search", title: "Spot something bright red outdoors.", hint: "A berry, a door, a mitten." },
  { id: "s4", category: "Search", title: "Find a heart-shaped anything.", hint: "Leaves, stones, spilled coffee." },
  { id: "s5", category: "Search", title: "Look for a feather on the ground.", hint: "Any color counts." },
  { id: "s6", category: "Search", title: "Hunt for a tiny mushroom.", hint: "Under logs, in the grass." },
  { id: "s7", category: "Search", title: "Find something washed up or blown in.", hint: "Edges of puddles, curbs, shorelines." },
  { id: "s8", category: "Search", title: "Find a leaf bigger than your hand.", hint: "Hold it up for scale." },
  { id: "s9", category: "Search", title: "Spot a flower growing where it shouldn't.", hint: "A crack, a gutter, a wall." },
  { id: "s10", category: "Search", title: "Find a stone with a stripe through it.", hint: "One clean line is enough." },
  { id: "s11", category: "Search", title: "Look for a spiderweb with the light behind it.", hint: "Early or late is best." },
  { id: "s12", category: "Search", title: "Find something perfectly symmetrical.", hint: "Nature rarely bothers." },
  { id: "s13", category: "Search", title: "Spot a bird's nest, old or new.", hint: "Bare branches give them away." },
  { id: "s14", category: "Search", title: "Find three shades of green in one spot.", hint: "Get them all in one frame." },
  { id: "s15", category: "Search", title: "Look for a seed that travels.", hint: "Dandelion, maple wing, burr." },
  { id: "s16", category: "Search", title: "Find something growing out of something dead.", hint: "Moss on a stump counts." },
  { id: "s17", category: "Search", title: "Spot a pinecone still holding on.", hint: "Or one already fallen." },
  { id: "s18", category: "Search", title: "Find an acorn, shell, or pod.", hint: "Something that used to hold a life." },
  { id: "s19", category: "Search", title: "Look for a stone shaped like a face.", hint: "Two dents and a line will do." },
  { id: "s20", category: "Search", title: "Find the bluest thing outside.", hint: "Not counting the sky." },
  { id: "s21", category: "Search", title: "Spot a fruit or berry on a branch.", hint: "Don't eat it, just admire." },
  { id: "s22", category: "Search", title: "Find a piece of bark that fell off.", hint: "Look at the pattern underneath." },
  { id: "s23", category: "Search", title: "Look for an insect's leftover home.", hint: "A shell, a gall, an empty web." },
  { id: "s24", category: "Search", title: "Find the tallest tree on your street.", hint: "Stand under it and look up." },
  { id: "s25", category: "Search", title: "Spot something furry that isn't an animal.", hint: "Moss, seedheads, fuzzy leaves." },
  { id: "s26", category: "Search", title: "Find a puddle worth photographing.", hint: "Reflections count double." },
  { id: "s27", category: "Search", title: "Look for a plant you can name.", hint: "Or one you'll look up later." },
  { id: "s28", category: "Search", title: "Find something with a perfect hole in it.", hint: "A leaf, a stone, a fence." },
  { id: "s29", category: "Search", title: "Spot the oldest-looking door outside.", hint: "Peeling paint is a good sign." },
  { id: "s30", category: "Search", title: "Find a rock you'd keep in your pocket.", hint: "It has to feel right." },
  { id: "s31", category: "Search", title: "Look for something orange in the wild.", hint: "Rust counts." },
  { id: "s32", category: "Search", title: "Find a flower with more than five petals.", hint: "Count them properly." },
  { id: "s33", category: "Search", title: "Spot moss growing on one side only.", hint: "Usually the shady one." },
  { id: "s34", category: "Search", title: "Find a branch shaped like a letter.", hint: "Y is easy, try for a harder one." },
  { id: "s35", category: "Search", title: "Look for the smallest flower you can find.", hint: "Get close enough to see it." },
  { id: "s36", category: "Search", title: "Find something that's been outside too long.", hint: "Faded, rusted, weathered." },
  { id: "s37", category: "Search", title: "Spot a tree with visible roots.", hint: "The messier the better." },
  { id: "s38", category: "Search", title: "Find two leaves that match exactly.", hint: "Harder than it sounds." },
  { id: "s39", category: "Search", title: "Look for a shell, bone, or feather quill.", hint: "Leave it where it was." },
  { id: "s40", category: "Search", title: "Find something shiny on the ground.", hint: "Glass, coin, wrapper, water." },

  // Notice — small acts of paying attention
  { id: "n1", category: "Notice", title: "Find a shape in the clouds.", hint: "Look up for one full minute." },
  { id: "n2", category: "Notice", title: "Find the oldest thing you can see.", hint: "A tree, a rock, a building." },
  { id: "n3", category: "Notice", title: "Notice one sound you usually tune out.", hint: "Then chase where it came from." },
  { id: "n4", category: "Notice", title: "Find a leaf with two colors.", hint: "Green fading to yellow, red tips, a brown edge." },
  { id: "n5", category: "Notice", title: "Spot the smallest living thing nearby.", hint: "An ant, a moss, a bud." },
  { id: "n6", category: "Notice", title: "Find where the light hits weirdest.", hint: "A reflection, a glow, a stripe." },
  { id: "n7", category: "Notice", title: "Notice one color that keeps repeating.", hint: "Once you see it you can't stop." },
  { id: "n8", category: "Notice", title: "Watch the weather change while you're in it.", hint: "Even a little shift counts." },
  { id: "n9", category: "Notice", title: "Find the best shadow outside right now.", hint: "Sharp edges or long ones." },
  { id: "n10", category: "Notice", title: "Notice what's directly above you.", hint: "Wires, branches, sky, ceiling of leaves." },
  { id: "n11", category: "Notice", title: "Find something that's changed since last week.", hint: "A bloom, a build, a bare branch." },
  { id: "n12", category: "Notice", title: "Look at one tree for a full minute.", hint: "Notice something you'd have missed." },
  { id: "n13", category: "Notice", title: "Notice which way the plants are leaning.", hint: "They're chasing something." },
  { id: "n14", category: "Notice", title: "Find the quietest spot you can reach.", hint: "Stand in it for 60 seconds." },
  { id: "n15", category: "Notice", title: "Notice a smell you weren't expecting.", hint: "Rain, bread, cut grass, engine." },
  { id: "n16", category: "Notice", title: "Spot something the wind is moving.", hint: "Watch it for a while." },
  { id: "n17", category: "Notice", title: "Find a texture worth touching.", hint: "Bark, moss, brick, fur." },
  { id: "n18", category: "Notice", title: "Notice where the sun is right now.", hint: "Photograph the light, not the sun." },
  { id: "n19", category: "Notice", title: "Find something growing that wasn't planted.", hint: "Volunteer plants are the best plants." },
  { id: "n20", category: "Notice", title: "Notice one thing that's fixed or repaired.", hint: "Patch, tape, splint, stitch." },
  { id: "n21", category: "Notice", title: "Find the most crooked thing outside.", hint: "Fences and trees compete." },
  { id: "n22", category: "Notice", title: "Notice a pattern that repeats in nature.", hint: "Veins, ripples, spirals." },
  { id: "n23", category: "Notice", title: "Find something that looks soft but isn't.", hint: "Or the other way around." },
  { id: "n24", category: "Notice", title: "Watch water do something.", hint: "Drip, pool, run, shine." },
  { id: "n25", category: "Notice", title: "Notice the first bird you hear.", hint: "Try to spot it too." },
  { id: "n26", category: "Notice", title: "Find the sharpest contrast you can see.", hint: "Dark against light." },
  { id: "n27", category: "Notice", title: "Notice something at ankle height.", hint: "A whole world down there." },
  { id: "n28", category: "Notice", title: "Find something older than you.", hint: "Be sure about it." },
  { id: "n29", category: "Notice", title: "Notice how the air feels today.", hint: "Photograph what shows it." },
  { id: "n30", category: "Notice", title: "Find a view you've walked past a hundred times.", hint: "Actually stop this time." },
  { id: "n31", category: "Notice", title: "Notice something that's almost gone.", hint: "Fading, wilting, worn away." },
  { id: "n32", category: "Notice", title: "Find the busiest tiny place nearby.", hint: "An anthill, a flower, a puddle." },
  { id: "n33", category: "Notice", title: "Notice a color you rarely see outside.", hint: "Purple, teal, hot pink." },
  { id: "n34", category: "Notice", title: "Look for something reflected in glass.", hint: "Two worlds in one frame." },
  { id: "n35", category: "Notice", title: "Notice what's growing in a crack.", hint: "Persistence looks like this." },
  { id: "n36", category: "Notice", title: "Find something that only looks good up close.", hint: "Get uncomfortably near." },
  { id: "n37", category: "Notice", title: "Notice the horizon line wherever you are.", hint: "Buildings, hills, trees, water." },
  { id: "n38", category: "Notice", title: "Find a spot where two things meet.", hint: "Grass and pavement, land and water." },
  { id: "n39", category: "Notice", title: "Notice something in motion and freeze it.", hint: "A leaf, a bird, a cyclist." },
  { id: "n40", category: "Notice", title: "Find the strangest thing on your street.", hint: "You know the one." },

  // Serendipity — luck-of-the-draw discoveries
  { id: "r1", category: "Serendipity", title: "Find something someone dropped.", hint: "A coin, a mitten, small serendipity." },
  { id: "r2", category: "Serendipity", title: "Follow whichever direction the wind's blowing.", hint: "See where it takes you." },
  { id: "r3", category: "Serendipity", title: "Turn left every time you'd normally go right.", hint: "For 10 minutes at least." },
  { id: "r4", category: "Serendipity", title: "Pick up the first interesting object you see.", hint: "Keep it or leave it." },
  { id: "r5", category: "Serendipity", title: "Take the long way somewhere.", hint: "One street you've never walked." },
  { id: "r6", category: "Serendipity", title: "Find a message meant for no one.", hint: "Sidewalk chalk, a sticker, a note." },
  { id: "r7", category: "Serendipity", title: "Go somewhere you've never been before.", hint: "Even one block counts." },
  { id: "r8", category: "Serendipity", title: "Walk until something makes you stop.", hint: "Photograph whatever it was." },
  { id: "r9", category: "Serendipity", title: "Follow a path just to see where it ends.", hint: "Turn back whenever you like." },
  { id: "r10", category: "Serendipity", title: "Let a song's length decide how far you walk.", hint: "Stop when it stops." },
  { id: "r11", category: "Serendipity", title: "Take the door or gate you've never used.", hint: "Different way out, different day." },
  { id: "r12", category: "Serendipity", title: "Follow a bird for as long as you can.", hint: "It'll win eventually." },
  { id: "r13", category: "Serendipity", title: "Pick a color, then follow it around.", hint: "Photograph the third one you find." },
  { id: "r14", category: "Serendipity", title: "Find something free that someone left out.", hint: "Books, plants, a chair." },
  { id: "r15", category: "Serendipity", title: "Go uphill until you can see something new.", hint: "Or upstairs, or up a bank." },
  { id: "r16", category: "Serendipity", title: "Take a photo without looking at the screen.", hint: "Point and hope." },
  { id: "r17", category: "Serendipity", title: "Walk 100 steps and photograph what's there.", hint: "No cheating with the count." },
  { id: "r18", category: "Serendipity", title: "Follow the sound of water.", hint: "Fountain, drain, river, rain." },
  { id: "r19", category: "Serendipity", title: "Find graffiti or a sticker you like.", hint: "Someone put it there for you." },
  { id: "r20", category: "Serendipity", title: "Go the direction with the most trees.", hint: "Trust the canopy." },
  { id: "r21", category: "Serendipity", title: "Find a lost item and leave it somewhere visible.", hint: "On a wall, off the ground." },
  { id: "r22", category: "Serendipity", title: "Take the first turn you've never taken.", hint: "Commit before you think." },
  { id: "r23", category: "Serendipity", title: "Follow someone's dog walk route for a block.", hint: "Dogs know the good bits." },
  { id: "r24", category: "Serendipity", title: "Find something out of place.", hint: "A shoe in a tree, a chair in a field." },
  { id: "r25", category: "Serendipity", title: "Walk toward the best-looking cloud.", hint: "It'll move; that's fine." },
  { id: "r26", category: "Serendipity", title: "Find a bench you've never sat on.", hint: "Sit for two minutes." },
  { id: "r27", category: "Serendipity", title: "Follow a wall or fence to its end.", hint: "See what it was hiding." },
  { id: "r28", category: "Serendipity", title: "Take a photo of the fifth thing you notice.", hint: "No editing the list." },
  { id: "r29", category: "Serendipity", title: "Find a shortcut you didn't know existed.", hint: "Alleys, cut-throughs, desire paths." },
  { id: "r30", category: "Serendipity", title: "Go outside without a destination.", hint: "Ten minutes, no plan." },
  { id: "r31", category: "Serendipity", title: "Find something someone made by hand.", hint: "Sign, garden, chalk, fix." },
  { id: "r32", category: "Serendipity", title: "Let a coin flip pick your route twice.", hint: "Heads left, tails right." },
  { id: "r33", category: "Serendipity", title: "Find the nearest place you can see the sky fully.", hint: "No wires, no branches." },
  { id: "r34", category: "Serendipity", title: "Look behind a building you always pass the front of.", hint: "Backs are more honest." },
  { id: "r35", category: "Serendipity", title: "Find a spot where you can't hear traffic.", hint: "Might take some walking." },
  { id: "r36", category: "Serendipity", title: "Photograph the first thing that makes you smile.", hint: "First, not best." },
  { id: "r37", category: "Serendipity", title: "Find something that wasn't there yesterday.", hint: "New, fallen, opened, built." },
  { id: "r38", category: "Serendipity", title: "Walk until you find a good hiding spot.", hint: "For a kid, or for you." },
  { id: "r39", category: "Serendipity", title: "Find a place that smells like somewhere else.", hint: "Memory has an address." },
  { id: "r40", category: "Serendipity", title: "Go left, left, right, and see where you land.", hint: "Photograph the corner you end at." },

  // Encounter — small human/creature contact
  { id: "e1", category: "Encounter", title: "Say hi to someone (or something) alive.", hint: "A stranger, a dog, a very good tree." },
  { id: "e2", category: "Encounter", title: "Spot an animal doing its thing.", hint: "A squirrel, a bird, a cat on a fence." },
  { id: "e3", category: "Encounter", title: "Wave at someone unexpectedly.", hint: "Bonus if they wave back." },
  { id: "e4", category: "Encounter", title: "Find a bug worth watching.", hint: "Follow it for a whole minute." },
  { id: "e5", category: "Encounter", title: "Find a spot you'd recommend to someone.", hint: "Ask a local, or just pick your own." },
  { id: "e6", category: "Encounter", title: "Share something small with someone.", hint: "A snack, a seat, a smile." },
  { id: "e7", category: "Encounter", title: "Find the friendliest-looking animal outside.", hint: "Photograph from a polite distance." },
  { id: "e8", category: "Encounter", title: "Watch a bird land and take off.", hint: "Patience required." },
  { id: "e9", category: "Encounter", title: "Find a pet being walked and admire it.", hint: "Ask before petting." },
  { id: "e10", category: "Encounter", title: "Notice someone doing something with care.", hint: "Gardening, sweeping, sketching." },
  { id: "e11", category: "Encounter", title: "Find a tree you'd introduce to a friend.", hint: "Give it a name." },
  { id: "e12", category: "Encounter", title: "Watch two animals interact.", hint: "Birds, squirrels, dogs, ants." },
  { id: "e13", category: "Encounter", title: "Say thank you to someone out loud.", hint: "Anyone, for anything." },
  { id: "e14", category: "Encounter", title: "Find where the birds are loudest.", hint: "Stand there a bit." },
  { id: "e15", category: "Encounter", title: "Spot an animal you don't usually see.", hint: "Or one you can't identify." },
  { id: "e16", category: "Encounter", title: "Hold a door or give up a seat today.", hint: "Photograph the place it happened." },
  { id: "e17", category: "Encounter", title: "Find a creature smaller than your thumbnail.", hint: "Get low." },
  { id: "e18", category: "Encounter", title: "Follow a trail an animal left.", hint: "Prints, chewed leaves, feathers." },
  { id: "e19", category: "Encounter", title: "Compliment something out loud.", hint: "A dog, a garden, a jacket." },
  { id: "e20", category: "Encounter", title: "Find a place where people gather.", hint: "Photograph it, not them." },
  { id: "e21", category: "Encounter", title: "Watch an insect land on a flower.", hint: "Bee, fly, butterfly, whatever comes." },
  { id: "e22", category: "Encounter", title: "Find evidence of an animal you can't see.", hint: "A hole, a nest, a nibble." },
  { id: "e23", category: "Encounter", title: "Sit near other people for five minutes.", hint: "No phone the whole time." },
  { id: "e24", category: "Encounter", title: "Find the best dog-watching bench nearby.", hint: "Report your findings." },
  { id: "e25", category: "Encounter", title: "Notice someone's small kindness.", hint: "Or do one yourself." },
  { id: "e26", category: "Encounter", title: "Spot a bird you can identify by sound alone.", hint: "Then find it." },
  { id: "e27", category: "Encounter", title: "Find a creature warming itself in the sun.", hint: "Cats are experts." },
  { id: "e28", category: "Encounter", title: "Ask someone for a small recommendation.", hint: "Or ask the internet if no one's around." },
  { id: "e29", category: "Encounter", title: "Find a garden someone clearly loves.", hint: "You can tell." },
  { id: "e30", category: "Encounter", title: "Watch something eat.", hint: "Bird, bug, squirrel, dog." },
  { id: "e31", category: "Encounter", title: "Find a window with a plant in it.", hint: "Someone's keeping it alive." },
  { id: "e32", category: "Encounter", title: "Notice a stranger's good idea.", hint: "A fix, a sign, a setup." },
  { id: "e33", category: "Encounter", title: "Find the busiest corner near you.", hint: "Stand still in the middle of it." },
  { id: "e34", category: "Encounter", title: "Spot an animal that spots you back.", hint: "Hold the eye contact." },
  { id: "e35", category: "Encounter", title: "Find something left out for animals.", hint: "Feeder, water bowl, seeds." },
  { id: "e36", category: "Encounter", title: "Notice a group of birds moving together.", hint: "Watch the shape they make." },
  { id: "e37", category: "Encounter", title: "Find someone's handwriting outdoors.", hint: "Sign, chalk, note, tag." },
  { id: "e38", category: "Encounter", title: "Find a tree that's clearly been climbed.", hint: "Worn bark, low branches." },
  { id: "e39", category: "Encounter", title: "Watch someone's dog decide something.", hint: "They deliberate seriously." },
  { id: "e40", category: "Encounter", title: "Find the most-used path in a green space.", hint: "The grass will tell you." },

  // Make — tiny creative acts
  { id: "m1", category: "Make", title: "Build a tiny cairn of stones.", hint: "Three stones minimum." },
  { id: "m2", category: "Make", title: "Arrange found objects into a pattern.", hint: "Leaves, pebbles, whatever." },
  { id: "m3", category: "Make", title: "Draw something using only what's around.", hint: "Stick in dirt, chalk on stone." },
  { id: "m4", category: "Make", title: "Press a leaf between two rocks.", hint: "Bring it home flat." },
  { id: "m5", category: "Make", title: "Make a nest out of found things.", hint: "For the smallest creature you can imagine." },
  { id: "m6", category: "Make", title: "Write a tiny message and leave it somewhere.", hint: "For a stranger to find." },
  { id: "m7", category: "Make", title: "Make land art with whatever's around you.", hint: "Leave it for someone to find." },
  { id: "m8", category: "Make", title: "Sort found things by color.", hint: "Rainbow order if you can." },
  { id: "m9", category: "Make", title: "Make a face out of natural objects.", hint: "Two stones and a stick." },
  { id: "m10", category: "Make", title: "Build the smallest shelter you can.", hint: "Bug-sized." },
  { id: "m11", category: "Make", title: "Trace a leaf's shape in the dirt.", hint: "Or on paper with a rubbing." },
  { id: "m12", category: "Make", title: "Make a bouquet of weeds.", hint: "Only what's already fallen or plentiful." },
  { id: "m13", category: "Make", title: "Stack things until they fall.", hint: "Photograph the tallest attempt." },
  { id: "m14", category: "Make", title: "Draw the view in 60 seconds.", hint: "Ugly is allowed." },
  { id: "m15", category: "Make", title: "Make a spiral out of found objects.", hint: "Start small, work out." },
  { id: "m16", category: "Make", title: "Write one sentence about where you are.", hint: "Photograph the spot with it." },
  { id: "m17", category: "Make", title: "Make a rubbing of a texture.", hint: "Paper and pencil on bark or stone." },
  { id: "m18", category: "Make", title: "Arrange found things from smallest to biggest.", hint: "Line them up neatly." },
  { id: "m19", category: "Make", title: "Build a little bridge over something.", hint: "A crack, a stream, a gap." },
  { id: "m20", category: "Make", title: "Make a crown out of what's on the ground.", hint: "Wear it for one photo." },
  { id: "m21", category: "Make", title: "Draw an arrow pointing at something good.", hint: "Sticks, stones, chalk." },
  { id: "m22", category: "Make", title: "Make a color palette from one small area.", hint: "Five things, five colors." },
  { id: "m23", category: "Make", title: "Balance one thing on another.", hint: "No hands in the photo." },
  { id: "m24", category: "Make", title: "Write today's date somewhere temporary.", hint: "Dirt, sand, chalk, condensation." },
  { id: "m25", category: "Make", title: "Make a tiny path out of pebbles.", hint: "To nowhere in particular." },
  { id: "m26", category: "Make", title: "Frame a view with your hands or found objects.", hint: "Photograph through the frame." },
  { id: "m27", category: "Make", title: "Make something float on water.", hint: "Leaf boat, stick raft." },
  { id: "m28", category: "Make", title: "Draw a map of the last ten minutes.", hint: "Landmarks only." },
  { id: "m29", category: "Make", title: "Make a shadow puppet outdoors.", hint: "Use the ground as your screen." },
  { id: "m30", category: "Make", title: "Collect five things and lay them in a grid.", hint: "Museum-style." },
  { id: "m31", category: "Make", title: "Make a wish and mark it somehow.", hint: "A knot, a stack, a scratch." },
  { id: "m32", category: "Make", title: "Draw the same thing twice, fast then slow.", hint: "Photograph both." },
  { id: "m33", category: "Make", title: "Make a pattern in dirt, sand, or snow.", hint: "Feet count as tools." },
  { id: "m34", category: "Make", title: "Write a two-line poem about what you see.", hint: "Rhyming optional." },
  { id: "m35", category: "Make", title: "Make an X marks the spot.", hint: "Somewhere worth returning to." },
  { id: "m36", category: "Make", title: "Turn something found into a tiny sculpture.", hint: "Five minutes max." },
  { id: "m37", category: "Make", title: "Line up leaves from lightest to darkest.", hint: "A gradient of the season." },
  { id: "m38", category: "Make", title: "Make a doorway or arch out of sticks.", hint: "Small enough for a mouse." },
  { id: "m39", category: "Make", title: "Leave a stack of stones for the next person.", hint: "Somewhere they'll notice." },
  { id: "m40", category: "Make", title: "Name a place you're standing in.", hint: "Write the name down with the photo." },
];

// Days since a fixed epoch so the same day always resolves to the same quest.
export function dayIndex(date: Date = new Date()): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc / 86_400_000);
}

const CATEGORY_ORDER: QuestCategory[] = ["Search", "Notice", "Serendipity", "Encounter", "Make"];

// Interleave the 30 quests so consecutive entries are always different
// categories: Search1, Notice1, Serendipity1, ... then round 2, etc.
const ROTATION: Quest[] = (() => {
  const byCat = CATEGORY_ORDER.map((c) => QUESTS.filter((q) => q.category === c));
  const rounds = Math.max(...byCat.map((l) => l.length));
  const out: Quest[] = [];
  for (let r = 0; r < rounds; r++) {
    for (const list of byCat) {
      if (list[r]) out.push(list[r]);
    }
  }
  return out;
})();

const PER_DAY = 3;

export function questForDate(
  date: Date = new Date(),
  completedIds: string[] = [],
): Quest {
  return questsForDate(date, completedIds)[0];
}

// Today's quest plus two backups from other categories. Each day consumes the
// next 3 quests in the rotation, so nothing repeats until the whole list
// (30 quests / 3 per day = 10 days) has cycled through. Completed quest IDs
// are skipped, so the user never sees a quest they've already finished.
export function questsForDate(
  date: Date = new Date(),
  completedIds: string[] = [],
): Quest[] {
  const idx = dayIndex(date);
  const start =
    (((idx * PER_DAY) % ROTATION.length) + ROTATION.length) % ROTATION.length;
  const completed = new Set(completedIds);
  const out: Quest[] = [];
  let i = 0;
  while (out.length < PER_DAY && i < ROTATION.length) {
    const q = ROTATION[(start + i) % ROTATION.length];
    if (!completed.has(q.id)) out.push(q);
    i++;
  }
  // If every quest has been completed, the cycle starts fresh.
  if (out.length === 0) {
    for (let j = 0; j < PER_DAY; j++) {
      out.push(ROTATION[(start + j) % ROTATION.length]);
    }
  }
  return out;
}



export function isoDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
