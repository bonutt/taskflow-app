import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../hooks/useTheme';
import LoginScreen from '../screens/auth/LoginScreen';
import TabRoutes from './TabRoutes';

export default function AppRoutes() {
  const { user, loading } = useAuth();
  const { loading: loadingTasks } = useTasks();
  const { isDark, colors } = useTheme();

  // enquanto carrega a sessao e as tarefas mostra um loading
  if (loading || loadingTasks) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {user ? <TabRoutes /> : <LoginScreen />}
    </NavigationContainer>
  );
}
