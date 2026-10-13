import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../data/users';
import { getSession, removeSession, saveSession } from '../services/authStorage';
import { Treatment, User } from '../types/user';

const TREATMENT_KEY = '@taskflow:treatment';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  treatment: Treatment;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changeTreatment: (value: Treatment) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [treatment, setTreatment] = useState<Treatment>('');

  // quando o app abre, verifica se ja tem alguem logado
  useEffect(() => {
    async function loadSession() {
      try {
        const savedUser = await getSession();
        if (savedUser) {
          setUser(savedUser);
        }
        const savedTreatment = await AsyncStorage.getItem(TREATMENT_KEY);
        if (savedTreatment) {
          setTreatment(savedTreatment as Treatment);
        }
      } catch (error) {
        console.log('Erro ao carregar sessão', error);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  async function login(username: string, password: string): Promise<boolean> {
    const found = users.find((u) => u.username === username.trim() && u.password === password);

    if (!found) {
      return false;
    }

    await saveSession(found);
    setUser(found);
    return true;
  }

  async function logout() {
    try {
      await removeSession();
    } catch (error) {
      console.log('Erro ao sair', error);
    }
    setUser(null);
  }

  async function changeTreatment(value: Treatment) {
    setTreatment(value);
    await AsyncStorage.setItem(TREATMENT_KEY, value);
  }

  return (
    <AuthContext.Provider value={{ user, loading, treatment, login, logout, changeTreatment }}>
      {children}
    </AuthContext.Provider>
  );
}
