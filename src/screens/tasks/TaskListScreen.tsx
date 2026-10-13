import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EmptyState from '../../components/EmptyState';
import FilterBar, { Filter } from '../../components/FilterBar';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks } = useTasks();
  const { colors } = useTheme();
  const [filter, setFilter] = useState<Filter>('todas');

  const filteredTasks = filter === 'todas' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header />

      <View style={styles.content}>
        <FilterBar selected={filter} onChange={setFilter} />

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} />
          )}
          ListEmptyComponent={
            <EmptyState
              message={tasks.length === 0 ? 'Você ainda não tem tarefas. Toque no + para criar!' : 'Nenhuma tarefa com esse filtro'}
            />
          }
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('TaskForm', {})}
        accessibilityRole="button"
        accessibilityLabel="Nova tarefa"
        accessibilityHint="Abre o formulário para cadastrar uma tarefa"
      >
        <Text style={[styles.addText, { color: colors.buttonText }]}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addText: {
    fontSize: 32,
    marginTop: -3,
  },
});
