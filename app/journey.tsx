import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { clearJourney, getJourney, JourneyEntry } from '@/data/journeyStore';

export default function JourneyScreen() {
  const router = useRouter();
  const [journey, setJourney] = useState<JourneyEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      getJourney().then(setJourney);
    }, [])
  );

  const totalCoins = journey.reduce((sum, j) => sum + j.coins, 0);
  const level = 1 + Math.floor(journey.length / 3);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>MY JOURNEY</ThemedText>
      <ThemedText style={styles.subheading}>Every trip tells a story</ThemedText>

      <ThemedView style={styles.coinBadge}>
        <ThemedText style={styles.coinBadgeText}>🪙 {totalCoins} TRAVEL COINS</ThemedText>
      </ThemedView>

      <ThemedText style={styles.statsLine}>
        📍 {journey.length} Adventures   🏆 Explorer Level {level}
      </ThemedText>

      <ScrollView style={styles.list}>
        {journey.length === 0 && (
          <ThemedText style={styles.empty}>No adventures yet — go find your first hidden gem.</ThemedText>
        )}
        {[...journey].reverse().map((j, i) => (
          <ThemedView key={i} style={styles.row}>
            <ThemedView style={styles.rowLeft}>
              <ThemedText style={styles.rowName}>{j.destination}</ThemedText>
              <ThemedText style={styles.rowSub}>{j.district} · {j.category}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.rowCoins}>+{j.coins} Coins</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/discover')}>
        <ThemedText style={styles.primaryButtonText}>FIND ANOTHER GEM</ThemedText>
      </Pressable>

      {journey.length > 0 && (
        <Pressable
          style={styles.resetButton}
          onPress={async () => {
            await clearJourney();
            setJourney([]);
          }}
        >
          <ThemedText style={styles.resetButtonText}>Reset journey</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  heading: { fontSize: 20, textAlign: 'center' },
  subheading: { opacity: 0.6, textAlign: 'center', marginTop: 2, marginBottom: 14 },
  coinBadge: {
    alignSelf: 'center',
    backgroundColor: '#C1512F',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  coinBadgeText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  statsLine: { textAlign: 'center', opacity: 0.7, fontSize: 12, marginTop: 12, marginBottom: 16 },
  list: { flex: 1 },
  empty: { textAlign: 'center', opacity: 0.5, marginTop: 30 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FDF6E8',
    borderWidth: 1,
    borderColor: 'rgba(43,27,18,0.1)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  rowLeft: { backgroundColor: 'transparent' },
  rowName: { fontWeight: '700', color: '#2B1B12' },
  rowSub: { opacity: 0.6, fontSize: 12, marginTop: 2, color: '#2B1B12' },
  rowCoins: { fontWeight: '700', color: '#8F3B22', fontSize: 12 },
  primaryButton: {
    backgroundColor: '#C1512F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: { color: '#fff', fontWeight: '800' },
  resetButton: { alignItems: 'center', padding: 8 },
  resetButtonText: { opacity: 0.5, fontSize: 12 },
});