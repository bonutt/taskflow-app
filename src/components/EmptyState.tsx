import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="clipboard-outline" size={60} color={colors.textLight} />
      <Text style={[styles.text, { color: colors.textLight }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});
