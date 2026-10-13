import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { TaskStatus } from '../types/task';

export type Filter = 'todas' | TaskStatus;

const filters: { value: Filter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendente', label: 'Pendentes' },
  { value: 'em_andamento', label: 'Andamento' },
  { value: 'concluida', label: 'Concluídas' },
];

interface Props {
  selected: Filter;
  onChange: (filter: Filter) => void;
}

export default function FilterBar({ selected, onChange }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {filters.map((item) => {
        const active = item.value === selected;
        return (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.button,
              { borderColor: colors.primary, backgroundColor: active ? colors.primary : 'transparent' },
            ]}
            onPress={() => onChange(item.value)}
            accessibilityRole="button"
            accessibilityLabel={`Filtrar ${item.label}`}
          >
            <Text style={{ color: active ? colors.buttonText : colors.primary, fontSize: 13 }}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
