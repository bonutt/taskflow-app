import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { TaskStackParamList } from '../../types/navigation';
import { statusLabel, TaskStatus } from '../../types/task';
import { formatDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

const statusList: TaskStatus[] = ['pendente', 'em_andamento', 'concluida'];

export default function TaskDetailScreen({ navigation, route }: Props) {
  const { tasks, changeStatus, deleteTask } = useTasks();
  const { colors } = useTheme();

  const task = tasks.find((t) => t.id === route.params.taskId);

  if (!task) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <EmptyState message="Tarefa não encontrada" />
      </View>
    );
  }

  async function handleStatus(newStatus: TaskStatus) {
    if (!task) return;
    try {
      await changeStatus(task.id, newStatus);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível alterar o status');
    }
  }

  function handleDelete() {
    Alert.alert('Excluir tarefa', 'Tem certeza que deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(route.params.taskId);
            Alert.alert('Pronto', 'Tarefa excluída');
            navigation.goBack();
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível excluir a tarefa');
          }
        },
      },
    ]);
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.row}>
          <Ionicons name={task.categoryIcon as keyof typeof Ionicons.glyphMap} size={36} color={colors.primary} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
            <Text style={{ color: colors.textLight }}>{task.category}</Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 12 }]}>
          <StatusBadge status={task.status} />
          <StatusBadge priority={task.priority} />
        </View>

        <Text style={[styles.label, { color: colors.textLight }]}>Descrição</Text>
        <Text style={{ color: colors.text, fontSize: 16 }}>{task.description}</Text>

        <Text style={[styles.label, { color: colors.textLight }]}>Datas</Text>
        <Text style={{ color: colors.text }}>Criada em: {formatDate(task.createdAt)}</Text>
        <Text style={{ color: colors.text }}>Atualizada em: {formatDate(task.updatedAt)}</Text>
      </View>

      <Text style={[styles.label, { color: colors.text }]}>Alterar status</Text>
      <View style={styles.row}>
        {statusList.map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.option,
              { borderColor: colors.primary, backgroundColor: task.status === s ? colors.primary : 'transparent' },
            ]}
            onPress={() => handleStatus(s)}
            accessibilityRole="button"
            accessibilityLabel={`Mudar status para ${statusLabel[s]}`}
          >
            <Text style={{ color: task.status === s ? colors.buttonText : colors.primary }}>{statusLabel[s]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton title="Editar" onPress={() => navigation.navigate('TaskForm', { taskId: task.id })} />
      <CustomButton title="Excluir" onPress={handleDelete} danger />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 4,
  },
  option: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
});
