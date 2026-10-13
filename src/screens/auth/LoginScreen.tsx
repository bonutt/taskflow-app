import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');

    if (username.trim() === '' || password === '') {
      setError('Preencha o usuário e a senha');
      return;
    }

    setLoading(true);
    try {
      const ok = await login(username, password);
      if (!ok) {
        setError('Usuário ou senha inválidos');
      }
    } catch (e) {
      setError('Erro ao fazer login, tente novamente');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logo}
          accessibilityLabel="Logo do TaskFlow"
        />
        <Text style={[styles.title, { color: colors.text }]}>TaskFlow</Text>
        <Text style={[styles.subtitle, { color: colors.textLight }]}>Faça login para continuar</Text>

        <CustomInput
          label="Usuário"
          placeholder="Digite seu usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <CustomInput
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}

        <CustomButton title="Entrar" onPress={handleLogin} loading={loading} />

        <View style={styles.hint}>
          <Text style={{ color: colors.textLight }}>admin / 123 ou user / 123</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  error: {
    textAlign: 'center',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  hint: {
    alignItems: 'center',
    marginTop: 20,
  },
});
