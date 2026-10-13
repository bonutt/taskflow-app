import React from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Treatment } from '../../types/user';

const treatments: Treatment[] = ['', 'Sr.', 'Sra.', 'Srta.'];

export default function SettingsScreen() {
  const { user, treatment, changeTreatment, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();

  async function handleTreatment(value: Treatment) {
    try {
      await changeTreatment(value);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o tratamento');
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Meu perfil</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={{ color: colors.text }}>Nome: {user?.name}</Text>
          <Text style={{ color: colors.text }}>Usuário: {user?.username}</Text>
          <Text style={{ color: colors.text }}>Perfil: {user?.role === 'admin' ? 'Administrador' : 'Usuário comum'}</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Tema</Text>
        <View style={[styles.card, styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={{ color: colors.text, fontSize: 16 }}>Modo escuro</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            accessibilityLabel="Modo escuro"
            accessibilityHint="Alterna entre tema claro e escuro"
          />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Como prefere ser chamado?</Text>
        <View style={styles.options}>
          {treatments.map((t) => (
            <TouchableOpacity
              key={t || 'nenhum'}
              style={[
                styles.option,
                { borderColor: colors.primary, backgroundColor: treatment === t ? colors.primary : 'transparent' },
              ]}
              onPress={() => handleTreatment(t)}
              accessibilityRole="radio"
              accessibilityState={{ selected: treatment === t }}
              accessibilityLabel={t || 'Nenhum'}
            >
              <Text style={{ color: treatment === t ? colors.buttonText : colors.primary }}>{t || 'Nenhum'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton title="Sair" onPress={() => logout()} danger />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
});
