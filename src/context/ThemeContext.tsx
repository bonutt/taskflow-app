import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@taskflow:theme';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textLight: string;
  border: string;
  primary: string;
  buttonText: string;
  danger: string;
  pendente: string;
  em_andamento: string;
  concluida: string;
  baixa: string;
  media: string;
  alta: string;
}

const lightColors: ThemeColors = {
  background: '#f2f2f7',
  card: '#ffffff',
  text: '#222222',
  textLight: '#666666',
  border: '#dddddd',
  primary: '#6200ee',
  buttonText: '#ffffff',
  danger: '#d32f2f',
  pendente: '#e68a00',
  em_andamento: '#1e6fd9',
  concluida: '#2e7d32',
  baixa: '#2e7d32',
  media: '#e68a00',
  alta: '#d32f2f',
};

const darkColors: ThemeColors = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  textLight: '#aaaaaa',
  border: '#333333',
  primary: '#bb86fc',
  buttonText: '#000000',
  danger: '#ef5350',
  pendente: '#ffb74d',
  em_andamento: '#64b5f6',
  concluida: '#81c784',
  baixa: '#81c784',
  media: '#ffb74d',
  alta: '#ef5350',
};

interface ThemeContextData {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // carrega o tema salvo quando abre o app
  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved === 'dark') {
          setIsDark(true);
        }
      } catch (error) {
        console.log('Erro ao carregar o tema', error);
      }
    }
    loadTheme();
  }, []);

  async function toggleTheme() {
    const novoValor = !isDark;
    setIsDark(novoValor);
    try {
      await AsyncStorage.setItem(THEME_KEY, novoValor ? 'dark' : 'light');
    } catch (error) {
      console.log('Erro ao salvar o tema', error);
    }
  }

  return (
    <ThemeContext.Provider value={{ isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
