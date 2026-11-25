// family-scene-20261125 — Make the AI Judge Feel Proud: A Family Scene
// Writes the best-scoring family scene (1-2 lines, <= 280 chars) to /output/entry.txt.
// Judge brief (from the kit): warm, proud judge; weighs, in order —
//   1. a real short family scene, warm enough to make a proud judge smile
//   2. heartfelt, genuine affection in a small domestic moment
//   3. light, recognisable humour, a small turn a family would actually laugh at
//   4. one or two lines used well, no word wasted
//   5. specific and fresh, one telling detail rather than a greeting-card line
// So the rubric below scores each draft on exactly those five axes, then
// picks the highest total. No network, no secrets, no reading outside files.

import { mkdirSync, writeFileSync } from "node:fs";

type Draft = {
  id: string;
  text: string;
  // Hand-scored against the judge brief, 0-5 per axis (warmth first).
  warmth: number;
  heartfelt: number;
  humour: number;
  tightness: number;
  specificity: number;
};

// Every draft is an original scene written for this entry: concrete names,
// numbers and places, a small domestic moment, and a wry closing turn.
// No draft uses the number 47, and none is a template or a slogan.
const DRAFTS: Draft[] = [
  {
    id: "dad-four-plates",
    text: "Every Sunday, Dad still sets four plates, though Mia moved to Chengdu in March. Last week he finally admitted the fourth is for Biscuit, who finishes first, then stares at us like we are the ones eating too slowly.",
    warmth: 5,
    heartfelt: 5,
    humour: 5,
    tightness: 4,
    specificity: 5,
  },
  {
    id: "grandma-dumplings",
    text: "Grandma counts her dumplings out loud \u2014 forty-one, forty-two \u2014 then slides three extra onto my plate when she thinks I am not looking. Caught, she blames her bad eyesight. She has worn the same glasses for twelve years.",
    warmth: 5,
    heartfelt: 5,
    humour: 4,
    tightness: 4,
    specificity: 4,
  },
  {
    id: "leo-chair",
    text: "Leo, six, fixed the wobbly kitchen chair with three stickers and a solemn nod. Dad thanked him, sat down very slowly, and has not moved the chair since Tuesday.",
    warmth: 4,
    heartfelt: 4,
    humour: 4,
    tightness: 5,
    specificity: 4,
  },
  {
    id: "mom-toast",
    text: "Mom burns the toast every morning and eats the blackest slice herself. \u201cThe crispy ones have more character,\u201d she says, and none of us has ever dared to disagree.",
    warmth: 4,
    heartfelt: 4,
    humour: 4,
    tightness: 5,
    specificity: 3,
  },
  {
    id: "photo-height-order",
    text: "Dad hung our family photos in height order, so the dog\u2019s portrait sits on the floor. \u201cHe\u2019s part of the family,\u201d Dad said, \u201cbut let\u2019s not pretend he\u2019s tall.\u201d",
    warmth: 4,
    heartfelt: 3,
    humour: 5,
    tightness: 5,
    specificity: 3,
  },
  {
    id: "grandpa-typo",
    text: "Grandpa, eighty-one, texts me goodnight every evening at 9 p.m. sharp, always with one typo. I never correct him \u2014 the typo is how I know it\u2019s really him.",
    warmth: 5,
    heartfelt: 5,
    humour: 3,
    tightness: 5,
    specificity: 4,
  },
];

// Weights follow the judge's own order: warmth first, then heartfelt,
// humour, tightness, specificity. A hard gate rejects any draft that
// cannot pass the sealed scorer (empty, > 280 chars, or more than 2 lines).
const WEIGHTS = { warmth: 5, heartfelt: 4, humour: 3, tightness: 2, specificity: 2 };

function gateOk(text: string): boolean {
  const chars = [...text].length;
  const lines = text.split("\n").length;
  // The batch rule: never use the number 47 (other entries in this batch may).
  if (text.includes("47")) return false;
  return text.trim().length > 0 && chars >= 1 && chars <= 280 && lines <= 2;
}

function score(d: Draft): number {
  return (
    d.warmth * WEIGHTS.warmth +
    d.heartfelt * WEIGHTS.heartfelt +
    d.humour * WEIGHTS.humour +
    d.tightness * WEIGHTS.tightness +
    d.specificity * WEIGHTS.specificity
  );
}

const ranked = DRAFTS.filter((d) => gateOk(d.text))
  .map((d) => ({ draft: d, total: score(d) }))
  .sort((a, b) => b.total - a.total || a.draft.text.length - b.draft.text.length);

if (ranked.length === 0) throw new Error("no draft passes the gate");

const winner = ranked[0];
for (const r of ranked) {
  console.log(`${r.draft.id}: score=${r.total} chars=${[...r.draft.text].length}`);
}
console.log(`winner: ${winner.draft.id} (score ${winner.total})`);
console.log(`entry: ${winner.draft.text}`);

// Write the winning scene with no trailing newline, then self-check the
// exact bytes that were written, the way the sealed gate scorer will.
const outPath = "/output/entry.txt";
mkdirSync("/output", { recursive: true });
writeFileSync(outPath, winner.draft.text, "utf8");

const { readFileSync } = await import("node:fs");
const written = readFileSync(outPath, "utf8");
const chars = [...written].length;
const lines = written.split("\n").length;
console.log(`wrote ${outPath}: ${chars} chars, ${lines} line(s)`);
if (written !== winner.draft.text) throw new Error("written text differs from winner");
if (!gateOk(written)) throw new Error("self-check failed: entry fails the gate");
if (written.endsWith("\n")) throw new Error("self-check failed: trailing newline");
console.log("self-check passed");
