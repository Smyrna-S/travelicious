import AsyncStorage from '@react-native-async-storage/async-storage';
import { Destination } from './destinations';

const STORAGE_KEY = 'travelicious_journey';

export type JourneyEntry = {
  id: string;
  destination: string;
  district: string;
  category: string;
  coins: number;
};

export async function getJourney(): Promise<JourneyEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addJourneyEntry(gem: Destination): Promise<void> {
  const current = await getJourney();
  const entry: JourneyEntry = {
    id: gem.id,
    destination: gem.destination,
    district: gem.district,
    category: gem.category,
    coins: gem.coins,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...current, entry]));
}

export async function clearJourney(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}