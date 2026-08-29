import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getJourney } from '@/data/journeyStore';
import { getRecommendation } from '@/data/recommendationEngine';

const categories = ['Nature', 'Culture & Heritage', 'Food', 'Adventure'];
const difficulties = ['Easy', 'Moderate'];
const budgets = ['₹', '₹₹', '₹₹₹'];
const durations = ['Half Day', '1 Day', '2 Days'];

function FilterRow({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (val: string | null) => void;
}) {
  return (
    <ThemedView style={styles.filterRow}>
      <ThemedText style={styles.filterLabel}>{label}</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          style={[styles.chip, selected === null && styles.chipActive]}
          onPress={() => onSelect(null)}
        >
          <ThemedText style={[styles.chipText, selected === null && styles.chipTextActive]}>Any</ThemedText>
        </Pressable>
        {options.map((opt) => (
          <Pressable
            key={opt}
            style={[styles.chip, selected === opt && styles.chipActive]}
            onPress={() => onSelect(opt)}
          >
            <ThemedText style={[styles.chipText, selected === opt && styles.chipTextActive]}>{opt}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

export default function DiscoverScreen() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const handlePick = async (category: string) => {
    const journey = await getJourney();
    const visitedIds = journey.map((j) => j.id);
    const gem = getRecommendation(category, visitedIds, {
      difficulty: difficulty ?? undefined,
      budget: budget ?? undefined,
      duration: duration ?? undefined,
    });
    if (!gem) {
      alert('No destinations match those filters yet — try loosening one.');
      return;
    }
    router.push({ pathname: '/hidden-gem', params: { id: gem.id } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Where will you wander?</ThemedText>
      <ThemedText style={styles.subtitle}>
        Tell us what kind of adventure you're looking for.
      </ThemedText>

      <FilterRow label="Difficulty" options={difficulties} selected={difficulty} onSelect={setDifficulty} />
      <FilterRow label="Budget" options={budgets} selected={budget} onSelect={setBudget} />
      <FilterRow label="Duration" options={durations} selected={duration} onSelect={setDuration} />

      <ThemedText style={styles.categoryLabel}>Category</ThemedText>
      {categories.map((cat) => (
        <Pressable key={cat} style={styles.pill} onPress={() => handlePick(cat)}>
          <ThemedText style={styles.pillText}>{cat}</ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, paddingTop: 60, paddingBottom: 40 },
  subtitle: { marginTop: 6, marginBottom: 20, opacity: 0.7 },
  filterRow: { marginBottom: 16 },
  filterLabel: { fontWeight: '700', fontSize: 12, marginBottom: 8, opacity: 0.8 },
  chip: {
    borderWidth: 1,
    borderColor: '#C1512F',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#C1512F' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#C1512F' },
  chipTextActive: { color: '#fff' },
  categoryLabel: { fontWeight: '700', fontSize: 12, marginTop: 4, marginBottom: 8, opacity: 0.8 },
  pill: {
    backgroundColor: '#FDF6E8',
    borderWidth: 1,
    borderColor: '#C1512F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  pillText: { fontWeight: '600', color: '#2B1B12' },
});