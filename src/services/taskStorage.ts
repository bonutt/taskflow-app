import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@taskflow:tasks';

export async function getTasks(): Promise<Task[]> {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  if (data) {
    return JSON.parse(data) as Task[];
  }
  return [];
}

export async function saveTasks(tasks: Task[]) {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
