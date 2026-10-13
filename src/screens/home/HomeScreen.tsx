import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { getRandomQuote, Quote } from '../../services/api';
import { TabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { tasks } = useTasks();
  const { colors } = useTheme();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadQuote() {
    setLoading(true);
    setError('');
    try {
      const data = await getRandomQuote();
      setQuote(data);
    } catch (e) {
      setError('Não foi possível carregar a frase. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuote();
  }, []);

  const pendentes = tasks.filter((t) => t.status === 'pendente').length;
  const andamento = tasks.filter((t) => t.status === 'em_andamento').length;
  const concluidas = tasks.filter((t) => t.status === 'concluida').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Frase do dia</Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {loading && <ActivityIndicator size="large" color={colors.primary} />}

          {!loading && error !== '' && (
            <View>
              <Text style={{ color: colors.danger, textAlign: 'center' }}>{error}</Text>
              <CustomButton title="Tentar novamente" onPress={loadQuote} outline />
            </View>
          )}

          {!loading && error === '' && quote && (
            <View>
              <Text style={[styles.quote, { color: colors.text }]}>"{quote.quote}"</Text>
              <Text style={[styles.author, { color: colors.textLight }]}>- {quote.author}</Text>
              <CustomButton title="Outra frase" onPress={loadQuote} outline />
            </View>
          )}
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Minhas tarefas</Text>
        <View style={styles.row}>
          <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.pendente }]}>
            <Text style={[styles.number, { color: colors.pendente }]}>{pendentes}</Text>
            <Text style={{ color: colors.text }}>Pendentes</Text>
          </View>
          <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.em_andamento }]}>
            <Text style={[styles.number, { color: colors.em_andamento }]}>{andamento}</Text>
            <Text style={{ color: colors.text }}>Andamento</Text>
          </View>
          <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.concluida }]}>
            <Text style={[styles.number, { color: colors.concluida }]}>{concluidas}</Text>
            <Text style={{ color: colors.text }}>Concluídas</Text>
          </View>
        </View>

        <CustomButton title="Ver tarefas" onPress={() => navigation.navigate('Tasks', { screen: 'TaskList' })} />
      </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  author: {
    textAlign: 'right',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    width: '31%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
