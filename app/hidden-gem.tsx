import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DESTINATIONS } from '@/data/destinations';

export default function HiddenGemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
      <ThemedText type="title">{gem.destination}</ThemedText>
      <ThemedText style={styles.district}>{gem.district}, Tamil Nadu</ThemedText>
      <ThemedText style={styles.mission}>{gem.mission}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  district: { opacity: 0.7, marginTop: 4, marginBottom: 20 },
  mission: { fontSize: 15, lineHeight: 22 },
});