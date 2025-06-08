'use client';

import React from 'react';

const stringDatabase = [
  'Mike starts explaining obscure game mechanics',
  'Mike use pipes for something apart from trasporting fluids',
  "Mikes runs into hos own 'pets' worms",
  'Someone in chat aks "What is he doing?"',
  "Mike gets killed by a bitter",
  'Mike builds two adjacent power poles for "symmetry"',
  'Mikes get low in his own base',
  "Mike a(b)uses trash slots for extra inventory space",
  "Mike forget to unmute himeself",
  "Mike get stuck in the forest",
  "Obssings over power pole placement",
  "A cursed splitter contraption is built",
  "Stops playing to watch rocket launch(es)",
  "Mike get sidetracked while being sidetracked",
  'Like a normal person',
  "Mike forgets to cancel the blinking when research fishes",
  "Mike forget to hide repair packs",
  "Mike forgets to read chat",
  "Misspell's game save name",
  "Mike fills a lake with fish",
  "Mike gets sidetracked",
  "Mike keep depleted miniers around for sentimental reasons",
  "Mike makes a comment about taking money out of Jeff Bezos' pocket",
  "Mike get overconfident",
  "Dosh Doshington appears in chat / get mentioned by Mike",
  "Turns on the wrong debug setting",
  "Mikes predicts what editing Mike thinks",
  "Stream dies for no reason",
  "Why don't you just use trains?",
  "Mike gets stuck in the forest",

]

const freeString = 'Let\'s make a save game';

function getRandomUniqueStrings(arr: string[], count: number): string[] {
  const used = new Set<number>();
  const result: string[] = [];
  while (result.length < count && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]!);
    }
  }
  return result;
}

const bingoStrings = getRandomUniqueStrings(stringDatabase, 24);

function BingoBoard() {
  const cells = [...bingoStrings.slice(0, 12), freeString, ...bingoStrings.slice(12)];
  return (
    <div className="grid grid-cols-5 gap-2 max-w-2xl mx-auto my-8">
      {cells.map((str, i) => (
      <div
        key={i}
        className="flex items-center justify-center h-24 bg-white/20 rounded text-center p-2 text-sm font-medium cursor-pointer transition-colors"
        onClick={e => {
          const el = e.currentTarget;
          el.style.backgroundColor = 'green';
        }}
      >
        {i === 12 ? freeString : str}
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
      </div>
    </main>
  );
}
