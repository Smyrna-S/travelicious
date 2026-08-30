import { JourneyEntry } from './journeyStore';

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  isUnlocked: (journey: JourneyEntry[]) => boolean;
};

function countByCategory(journey: JourneyEntry[], category: string) {
  return journey.filter((j) => j.category === category).length;
}

export const BADGES: Badge[] = [
  { id: 'first-steps', name: 'First Steps', emoji: '🥾', isUnlocked: (j) => j.length >= 1 },
  { id: 'nature-lover', name: 'Nature Lover', emoji: '🌿', isUnlocked: (j) => countByCategory(j, 'Nature') >= 3 },
  { id: 'culture-buff', name: 'Culture Buff', emoji: '🏛️', isUnlocked: (j) => countByCategory(j, 'Culture & Heritage') >= 3 },
  { id: 'foodie', name: 'Foodie', emoji: '🍛', isUnlocked: (j) => countByCategory(j, 'Food') >= 3 },
  { id: 'thrill-seeker', name: 'Thrill Seeker', emoji: '🧗', isUnlocked: (j) => countByCategory(j, 'Adventure') >= 3 },
  { id: 'seasoned-explorer', name: 'Seasoned Explorer', emoji: '🗺️', isUnlocked: (j) => j.length >= 5 },
  { id: 'travel-legend', name: 'Travel Legend', emoji: '👑', isUnlocked: (j) => j.length >= 10 },
  { id: 'coin-collector', name: 'Coin Collector', emoji: '🪙', isUnlocked: (j) => j.reduce((sum, e) => sum + e.coins, 0) >= 300 },
];