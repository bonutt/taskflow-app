import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { user, treatment, logout } = useAuth();
  const { colors } = useTheme();

  function handleLogout() {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => logout() },
    ]);
  }

  if (!user) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View>
        <Text style={[styles.name, { color: colors.text }]}>
          Olá, {treatment ? treatment + ' ' : ''}{user.name}
        </Text>
        <Text style={{ color: colors.textLight }}>Perfil: {user.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        accessibilityRole="button"
        accessibilityLabel="Sair"
        accessibilityHint="Faz logout e volta para a tela de login"
      >
        <Ionicons name="log-out-outline" size={28} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
