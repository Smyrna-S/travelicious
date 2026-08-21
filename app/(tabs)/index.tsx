


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
  <ThemedView style={styles.container}>
  <ThemedText>🍁</ThemedText>
  <ThemedText type="title">TRAVELICIOUS</ThemedText>
  <ThemedText>Don't just visit. Experience.</ThemedText>
  <Pressable style={styles.button} onPress={() => router.push('/discover')}>
    <ThemedText style={styles.buttonText}>START EXPLORING</ThemedText>
  </Pressable>
</ThemedView> );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    gap: 12
  },
  button:{
    backgroundColor: '#C1512F',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold'
  },

  
});
