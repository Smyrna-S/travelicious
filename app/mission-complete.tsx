import { addJourneyEntry } from '@/data/journeyStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DESTINATIONS } from '@/data/destinations';

export default function MissionCompleteScreen() {
  const { id, photoUri } = useLocalSearchParams<{ id: string; photoUri?: string }>();
  const router = useRouter();
  const gem = DESTINATIONS.find((d) => d.id === id);
  useEffect(() => {
  if (gem) {
    addJourneyEntry(gem, photoUri || undefined);
  }
  }, [gem]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.emoji}>🎉</ThemedText>
      <ThemedText type="title" style={styles.heading}>MISSION COMPLETE!</ThemedText>
      <ThemedText style={styles.subheading}>
        You experienced {gem?.destination ?? 'this place'} like a local.
      </ThemedText>

      <ThemedText style={styles.coinAmount}>+{gem?.coins ?? 0}</ThemedText>
      <ThemedText style={styles.coinLabel}>TRAVEL COINS</ThemedText>

      <ThemedText style={styles.nextHint}>Your next hidden gem awaits.</ThemedText>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/discover')}>
        <ThemedText style={styles.primaryButtonText}>UNLOCK NEXT ADVENTURE</ThemedText>
      </Pressable>

      <Pressable
        style={styles.linkButton}
        onPress={() => router.push('/journey')}
      >
        <ThemedText style={styles.linkButtonText}>View my journey</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 40, marginBottom: 8 },
  heading: { fontSize: 20 },
  subheading: { opacity: 0.7, textAlign: 'center', marginTop: 6, marginBottom: 28 },
  coinAmount: { fontSize: 34, fontWeight: '800', color: '#C1512F' },
  coinLabel: { fontWeight: '700', letterSpacing: 1, marginTop: 2, marginBottom: 28 },
  nextHint: { opacity: 0.6, fontSize: 12, marginBottom: 28 },
  primaryButton: {
    width: '100%',
    backgroundColor: '#C1512F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: { color: '#fff', fontWeight: '800' },
  linkButton: { padding: 6 },
  linkButtonText: { opacity: 0.7, fontWeight: '600' },
});