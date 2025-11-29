/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import React, { useState, useEffect } from "react";

const stringDatabase: string[] = [
  "Mike starts explaining obscure game mechanics",
  "Mike use pipes for something else than transporting fluids",
  'Mike runs into his own "pet worms" (and they cause damage)',
  "Mike gets killed",
  'Mike builds two adjacent power poles "for symmetry"',
  "Mike spends over an hour nonstop in editor mode",
  "Mike saves a trip by using trash slots for extra inventory space",
  "Mike forgets to unmute himeself",
  "Mike gets stuck in the forest/cliffs while reading chat",
  "Mike obssesses over power pole placement",
  "Mike stops playing to watch rocket launch",
  "Mike gets sidetracked while already being sidetracked",
  "Mike forgets to cancel the blinking when research finishes",
  "Mike forgets to hide repair packs (during combat)",
  "Mike makes a mistake which everyone sees but he doesn't read chat",
  "Mike expands his starter lake fish empire",
  "Mike keeps additional depleted miners/obsolete infrastructure around",
  "Mike gets overconfident / overcomplacent",
  "Mike turns on the wrong debug setting",
  "Mike predicts what editing Mike will think",
  "Mike triggers an ingame achievement",
  "Maik Missspelll's savegamename",
  "Dosh Doshington appears in chat",
  "Stream dies for no reason",
  '"A cursed splitter contraption is built"',
  '"A cursed belt weaving contraption is built"',
  'Mike: "Like a normal person"',
  'Mike: "Let\'s make a save"',
  'Mike: "Thanks for taking money straight outta Jeff Bezos\' pocket"',
  'Chat: "What is he doing?"',
  'Chat: "Why don\'t you just use trains?"',
  'Chat: "Why don\'t you just use bots/logistics system?"',
  'Chat: "Why don\'t you just use nukes/artillery?"',
  'Chat: "Why don\'t you just use a tank/spidertron?"',
  'Chat: "Why don\'t you just use fast/bulk/stack inserters?"',
  "If at least 3 out of 4 adjacent tiles are lit, THIS tile is lit!",
  "Mike is on the wrong screen.",
  '"Someone in chat claims resource X is free on plannet Y"',
  "Mike explains why one does not need to make a mall",
  "Mike ignores Hydrate / Stretch Reward redeems",
  "Mike hand feeds 1000x of one item",
  "Mike acts like a legendary logistic bot",
  "Mike runs back and forth because he forgot things multiple times",
  'Mike mispronounces "variance"',
  "Mike forgets to use Foundery or EM plants",
  "People discussing usefulness Fast inserters",
];

const freeString = "Mike gets sidetracked";

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getRandomUniqueStrings(
  arr: string[],
  count: number,
  rng: () => number,
): string[] {
  const pool = [...arr];
  const result: string[] = [];
  while (result.length < count && pool.length > 0) {
    const idx = Math.floor(rng() * pool.length);
    result.push(pool.splice(idx, 1)[0]!);
  }
  return result;
}

function BingoBoard() {
  const [cells, setCells] = useState<string[]>([]);
  const [storageKey, setStorageKey] = useState<string>("");
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let userId = localStorage.getItem("bingoUserId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("bingoUserId", userId);
    }

    const today = new Date().toISOString().split("T")[0];
    const seed = today + "-" + userId;
    const key = "bingoState-" + seed;

    const rng = mulberry32(hashString(seed));
    const bingoStrings = getRandomUniqueStrings(stringDatabase, 24, rng);

    const generatedCells = [
      ...bingoStrings.slice(0, 12),
      freeString,
      ...bingoStrings.slice(12),
    ];

    setCells(generatedCells);
    setStorageKey(key);

    const saved = localStorage.getItem(key);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  const toggleCell = (i: number) => {
    setChecked((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  if (cells.length === 0) {
    return <div>Loading bingo board...</div>;
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-5 gap-2">
      {cells.map((str, i) => (
        <div
          key={i}
          className={`flex h-36 cursor-pointer items-center justify-center rounded p-2 text-center text-sm font-medium transition-colors ${
            checked.includes(i) ? "bg-green-500" : "bg-white/20"
          }`}
          onClick={() => toggleCell(i)}
        >
          {str}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Mike Hendi Bingo board
        </h1>
        <BingoBoard />
        <button
          className="mt-4 rounded bg-purple-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Reset Board
        </button>
      </div>
      <footer className="flex h-24 w-full items-center justify-center border-t border-white/10">
        <a href="https://discord.com/invite/cV6QEfmXh5">
          Mike Hendriks Discord
        </a>{" "}
        / ObsoleteAlien /{" "}
        <a href="https://github.com/jaapmarcus/">Jaap Marcus</a>{" "}
        /{" "} <a href="https://github.com/jaapmarcus/mikehendi-bingo/blob/main/README.md"> Read ME</a>{" "} / {" "} 
        <a href="https://github.com/jaapmarcus/mikehendi-bingo">Suggest changes to bingo square</a>
      </footer>
    </main>
  );
}
