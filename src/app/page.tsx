'use client';

import React from 'react';

const stringDatabase = [
  'Mike starts explaining obscure game mechanics',
  'Mike use pipes for something else than transporting fluids',
  'Mike runs into his own "pet worms" (and they cause damage)',
  'Mike gets killed',
  'Mike builds two adjacent power poles "for symmetry"',
  'Mike spends over an hour nonstop in editor mode',
  'Mike saves a trip by using trash slots for extra inventory space',
  'Mike forgets to unmute himeself',
  'Mike gets stuck in the forest/cliffs while reading chat',
  'Mike obssesses over power pole placement',
  'Mike stops playing to watch rocket launch',
  'Mike gets sidetracked while alreadybeing sidetracked',
  'Mike forgets to cancel the blinking when research finishes',
  'Mike forgets to hide repair packs (during combat)',
  'Mike makes a mistake which everyone sees but he doesn\'t read chat',
  'Mike expands his starter lake fish empire',
  'Mike keeps additional depleted miners/obsolete infrastructure around',
  'Mike gets overconfident / overcomplacent',
  'Mike turns on the wrong debug setting',
  'Mike predicts what editing Mike will think',
  'Mike triggers an ingame achievement',
  'Maik Missspelll\'s savegamename',
  'Dosh Doshington appears in chat',
  'Stream dies for no reason',
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
  'If at least 3 out of 4 adjacent tiles are lit, THIS tile is lit!',
  'Mike is on the wrong screen.',
  '"Someone in chat claims resource X is free on plannet Y"',
  'Mike explains why one does not need to make a mall',
  'Mike ignores Hydrate / Stretch Reward redeems',
]

const freeString = 'Mike gets sidetracked';

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
    <div className="grid grid-cols-5 gap-2 max-w-4xl mx-auto my-">
      {cells.map((str, i) => (
      <div
        key={i}
        className="flex items-center justify-center h-36 bg-white/20 rounded text-center p-2 text-sm font-medium cursor-pointer transition-colors"
        onClick={e => {
          const el = e.currentTarget;
          if (el.style.backgroundColor === 'green') {
        el.style.backgroundColor = '';
          } else {
        el.style.backgroundColor = 'green';
          }
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
      <footer className="flex items-center justify-center w-full h-24 border-t border-white/10">
        <a href="https://discord.com/invite/cV6QEfmXh5">Mike Hendriks Discord</a> / ObsoleteAlien / <a href="https://github.com/jaapmarcus/">Jaap Marcus</a>
      </footer>
    </main>
  );
}
