import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DESTINATIONS } from '@/data/destinations';
import { addJourneyEntry } from '@/data/journeyStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Pressable, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CONFETTI_EMOJIS = ['🎉', '✨', '🌟', '🎊'];
const CONFETTI_COUNT = 18;

function ConfettiPiece({ delay, left, emoji }: { delay: number; left: number; emoji: string }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  Animated.timing(anim, {
  toValue: 1,
  duration: 2200,
  delay,
  easing: Easing.out(Easing.quad),
  useNativeDriver: true,
}).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 220] });
  const opacity = anim.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] });

  return (
    <Animated.Text
      style={[
        styles.confettiPiece,
        { left, transform: [{ translateY }], opacity },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
}

export default function MissionCompleteScreen() {
  const { id } = useLocalSearchParams<{ id: string; photoUri?: string }>();
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
  const router = useRouter();
  const gem = DESTINATIONS.find((d) => d.id === id);
  const [displayCoins, setDisplayCoins] = useState(0);

  useEffect(() => {
    if (gem) {
      addJourneyEntry(gem, photoUri || undefined);
    }
  }, [gem]);

  useEffect(() => {
    if (!gem) return;
    const target = gem.coins;
    const stepTime = 30;
    const steps = Math.max(1, Math.round(600 / stepTime));
    const increment = target / steps;
    let current = 0;
    let count = 0;

    const interval = setInterval(() => {
      count += 1;
      current += increment;
      if (count >= steps) {
        setDisplayCoins(target);
        clearInterval(interval);
      } else {
        setDisplayCoins(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [gem]);

  const confettiPieces = Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
    delay: Math.random() * 300,
    left: Math.random() * (SCREEN_WIDTH - 40),
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
  }));

  return (
    <ThemedView style={styles.container}>
      {confettiPieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}

      <ThemedText style={styles.emoji}>🎉</ThemedText>
      <ThemedText type="title" style={styles.heading}>MISSION COMPLETE!</ThemedText>
      <ThemedText style={styles.subheading}>
        You experienced {gem?.destination ?? 'this place'} like a local.
      </ThemedText>

      <ThemedText style={styles.coinAmount}>+{displayCoins}</ThemedText>
      <ThemedText style={styles.coinLabel}>TRAVEL COINS</ThemedText>

      <ThemedText style={styles.nextHint}>Your next hidden gem awaits.</ThemedText>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/discover')}>
        <ThemedText style={styles.primaryButtonText}>UNLOCK NEXT ADVENTURE</ThemedText>
      </Pressable>

      <Pressable style={styles.linkButton} onPress={() => router.push('/journey')}>
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
  confettiPiece: {
    position: 'absolute',
    top: -20,
    fontSize: 20,
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