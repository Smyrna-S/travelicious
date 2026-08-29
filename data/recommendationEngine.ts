import { DESTINATIONS, Destination } from './destinations';

export type Filters = {
  difficulty?: string;
  budget?: string;
  duration?: string;
};

export function getRecommendation(
  category: string,
  visitedIds: string[] = [],
  filters: Filters = {}
): Destination | null {
  let pool = DESTINATIONS.filter((d) => d.category === category);

  if (filters.difficulty) pool = pool.filter((d) => d.difficulty === filters.difficulty);
  if (filters.budget) pool = pool.filter((d) => d.budget === filters.budget);
  if (filters.duration) pool = pool.filter((d) => d.duration === filters.duration);

  if (pool.length === 0) return null;

  const unvisited = pool.filter((d) => !visitedIds.includes(d.id));
  const finalPool = unvisited.length > 0 ? unvisited : pool;

  const sorted = [...finalPool].sort(
    (a, b) => (b.coins + b.gemScore) - (a.coins + a.gemScore)
  );

  return sorted[0];
}