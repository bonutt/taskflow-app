import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  danger?: boolean;
  outline?: boolean;
}

export default function CustomButton({ title, onPress, loading, danger, outline }: Props) {
  const { colors } = useTheme();

  let backgroundColor = colors.primary;
  let textColor = colors.buttonText;
  if (danger) {
    backgroundColor = colors.danger;
    textColor = '#ffffff';
  }
  if (outline) {
    backgroundColor = 'transparent';
    textColor = colors.primary;
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, borderColor: danger ? colors.danger : colors.primary }]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
