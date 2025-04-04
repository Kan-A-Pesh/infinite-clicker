import { Generator } from "../types/generator";

export const baseGenerators: Generator[] = [
  {
    emojiIcon: "👀",
    name: "Watcher",
    description: "Auto-watch brainrot videos",
    unitPerSecond: 1,
    cost: 100,
    inflationCost: 100,
  },
  {
    emojiIcon: "🤬",
    name: "Screamer",
    description: 'Screams "Hawk Tuah" for you',
    unitPerSecond: 2,
    cost: 200,
    inflationCost: 200,
  },
  {
    emojiIcon: "💸",
    name: "Investor",
    description: "Invests in the $SKIBIDI token",
    unitPerSecond: 4,
    cost: 300,
    inflationCost: 300,
  },
  {
    emojiIcon: "🦈",
    name: "Tralala",
    description: 'Spams the "Tralalero Tralala" meme',
    unitPerSecond: 4,
    cost: 400,
    inflationCost: 400,
  },
  {
    emojiIcon: "🎥",
    name: "Video Editor",
    description: "Generates brainrot videos",
    unitPerSecond: 6,
    cost: 500,
    inflationCost: 500,
  },
];
