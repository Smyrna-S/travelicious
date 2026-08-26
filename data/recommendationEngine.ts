import { DESTINATIONS, Destination } from './destinations';

export function getRecommendation(
  category: string,
  visitedIds: string[] = []
): Destination | null {
  const inCategory = DESTINATIONS.filter((d) => d.category === category);

  if (inCategory.length === 0) return null;

  const unvisited = inCategory.filter((d) => !visitedIds.includes(d.id));
  const pool = unvisited.length > 0 ? unvisited : inCategory;

  const sorted = [...pool].sort(
    (a, b) => (b.coins + b.gemScore) - (a.coins + a.gemScore)
  );

  return sorted[0];
}