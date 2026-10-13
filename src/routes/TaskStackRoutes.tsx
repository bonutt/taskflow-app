import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../hooks/useTheme';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import TaskFormScreen from '../screens/tasks/TaskFormScreen';
import TaskListScreen from '../screens/tasks/TaskListScreen';
import { TaskStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export default function TaskStackRoutes() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Nova tarefa' }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
}
