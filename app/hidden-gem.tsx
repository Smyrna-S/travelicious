import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DESTINATIONS } from '@/data/destinations';

const CATEGORY_COLOR: Record<string, string> = {
  Nature: '#4A6B4A',
  'Culture & Heritage': '#8A4A2B',
  Food: '#A15A2A',
  Adventure: '#2B5A6B',
};

export default function HiddenGemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const gem = DESTINATIONS.find((d) => d.id === id);

  if (!gem) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Destination not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>We found something for you…</ThemedText>
      <ThemedText style={styles.subheading}>A little off the beaten path.</ThemedText>

      <View style={[styles.imageBlock, { backgroundColor: CATEGORY_COLOR[gem.category] || '#555' }]}>
        <View style={styles.categoryTag}>
          <ThemedText style={styles.categoryTagText}>{gem.category}</ThemedText>
        </View>
      </View>

      <ThemedText type="title" style={styles.destinationName}>{gem.destination}</ThemedText>
      <ThemedText style={styles.district}>{gem.district}, Tamil Nadu</ThemedText>

      <ThemedText style={styles.sectionLabel}>Why Travelicious picked it</ThemedText>
      <ThemedText style={styles.body}>
        {gem.experience} — best visited {gem.season}. Rated {gem.gemScore}/10 for hidden-gem appeal.
      </ThemedText>

      <View style={styles.missionCard}>
        <ThemedText style={styles.missionLabel}>✨ YOUR TRAVEL MISSION</ThemedText>
        <ThemedText style={styles.missionText}>{gem.mission}</ThemedText>
        <ThemedText style={styles.coinText}>🪙 +{gem.coins} Travel Coins</ThemedText>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => alert('Mission complete! (Mission Complete screen coming in the next step)')}
      >
        <ThemedText style={styles.buttonText}>COMPLETE MISSION</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  heading: { fontSize: 20 },
  subheading: { opacity: 0.7, marginTop: 4, marginBottom: 18 },
  imageBlock: {
    height: 150,
    borderRadius: 14,
    justifyContent: 'flex-end',
    padding: 12,
    marginBottom: 16,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  categoryTagText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  destinationName: { fontSize: 22 },
  district: { opacity: 0.7, marginTop: 2, marginBottom: 16 },
  sectionLabel: { fontWeight: '700', marginBottom: 4 },
  body: { lineHeight: 21, opacity: 0.85, marginBottom: 16 },
  missionCard: {
    backgroundColor: '#8F3B22',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  missionLabel: { color: '#fff', fontWeight: '800', fontSize: 12, marginBottom: 6 },
  missionText: { color: '#fff', lineHeight: 20, marginBottom: 10 },
  coinText: { color: '#fff', fontWeight: '800' },
  button: {
    backgroundColor: '#C1512F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '800' },
});