import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { priorityLabel, statusLabel, TaskPriority, TaskStatus } from '../types/task';

interface Props {
  status?: TaskStatus;
  priority?: TaskPriority;
}

// mostra o status ou a prioridade com uma cor
export default function StatusBadge({ status, priority }: Props) {
  const { colors } = useTheme();

  let text = '';
  let color = colors.textLight;

  if (status) {
    text = statusLabel[status];
    color = colors[status];
  } else if (priority) {
    text = 'Prioridade ' + priorityLabel[priority];
    color = colors[priority];
  }

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
