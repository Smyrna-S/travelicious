import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, StyleSheet } from 'react-native';

export default function DiscoverScreen() {
  const categories = ['Nature', 'Culture & Heritage', 'Food', 'Adventure'];
  return (
  <ThemedView style={styles.container}>
  
  <ThemedText type="title">Where will you wander?</ThemedText>
  <ThemedText>Tell us what kind of adventure you're looking for</ThemedText>
  {categories.map((cat) => (
  <Pressable key={cat} style={styles.pill} onPress={() => alert(cat)}>
    <ThemedText style={styles.pillText}>{cat}</ThemedText>
  </Pressable>
))}
</ThemedView> );


    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:24
    
  },
  pill: {
  backgroundColor: '#FDF6E8',
  borderWidth: 1,
  borderColor: '#C1512F',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
},
pillText: {
  fontWeight: '600',
  color: '#2B1B12',
},
  

  
});