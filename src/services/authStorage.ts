import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const SESSION_KEY = '@taskflow:session';

export async function saveSession(user: User) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function getSession(): Promise<User | null> {
  const data = await AsyncStorage.getItem(SESSION_KEY);
  if (data) {
    return JSON.parse(data) as User;
  }
  return null;
}

export async function removeSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
