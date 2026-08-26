import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getRecommendation } from '@/data/recommendationEngine';

const categories = ['Nature', 'Culture & Heritage', 'Food', 'Adventure'];

export default function DiscoverScreen() {
  const router = useRouter();

  const handlePick = (category: string) => {
    const gem = getRecommendation(category, []); // empty array = no visited history yet
    if (!gem) return;
    router.push({ pathname: '/hidden-gem', params: { id: gem.id } });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Where will you wander?</ThemedText>
      <ThemedText style={styles.subtitle}>
        Tell us what kind of adventure you're looking for.
      </ThemedText>

      {categories.map((cat) => (
        <Pressable key={cat} style={styles.pill} onPress={() => handlePick(cat)}>
          <ThemedText style={styles.pillText}>{cat}</ThemedText>
        </Pressable>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  subtitle: { marginTop: 6, marginBottom: 24, opacity: 0.7 },
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