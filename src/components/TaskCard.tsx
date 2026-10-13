import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { Task } from '../types/task';
import { formatDate } from '../utils/formatDate';
import StatusBadge from './StatusBadge';

interface Props {
  task: Task;
  onPress: () => void;
}

export default function TaskCard({ task, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Tarefa ${task.title}`}
      accessibilityHint="Abre os detalhes da tarefa"
    >
      <View style={styles.row}>
        <Ionicons
          name={task.categoryIcon as keyof typeof Ionicons.glyphMap}
          size={30}
          color={colors.primary}
        />
        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
          <Text style={{ color: colors.textLight }}>{task.category}</Text>
        </View>
      </View>

      <View style={styles.badges}>
        <StatusBadge status={task.status} />
        <StatusBadge priority={task.priority} />
      </View>

      <Text style={[styles.date, { color: colors.textLight }]}>Criada em: {formatDate(task.createdAt)}</Text>
      <Text style={[styles.date, { color: colors.textLight }]}>Atualizada em: {formatDate(task.updatedAt)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badges: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
});
