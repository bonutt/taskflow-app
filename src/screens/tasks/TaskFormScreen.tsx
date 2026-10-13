import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { TaskStackParamList } from '../../types/navigation';
import { categories, priorityLabel, statusLabel, TaskPriority, TaskStatus } from '../../types/task';
import { FormErrors, validateTask } from '../../utils/validation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

const statusList: TaskStatus[] = ['pendente', 'em_andamento', 'concluida'];
const priorityList: TaskPriority[] = ['baixa', 'media', 'alta'];

export default function TaskFormScreen({ navigation, route }: Props) {
  const { tasks, addTask, updateTask } = useTasks();
  const { colors } = useTheme();

  const taskId = route.params?.taskId;
  const editingTask = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(editingTask ? editingTask.title : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');
  const [status, setStatus] = useState<TaskStatus>(editingTask ? editingTask.status : 'pendente');
  const [priority, setPriority] = useState<TaskPriority>(editingTask ? editingTask.priority : 'media');
  const [category, setCategory] = useState(editingTask ? editingTask.category : '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editingTask ? 'Editar tarefa' : 'Nova tarefa' });
  }, []);

  async function handleSave() {
    const form = { title, description, status, priority, category };
    const validationErrors = validateTask(form);
    setErrors(validationErrors);

    // se tiver algum erro nao salva
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSaving(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.id, form);
        Alert.alert('Sucesso', 'Tarefa atualizada!');
      } else {
        await addTask(form);
        Alert.alert('Sucesso', 'Tarefa cadastrada!');
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa');
    } finally {
      setSaving(false);
    }
  }

  // botao de opcao (usado em categoria, status e prioridade)
  function renderOption(label: string, selected: boolean, onPress: () => void) {
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.option,
          { borderColor: colors.primary, backgroundColor: selected ? colors.primary : 'transparent' },
        ]}
        onPress={onPress}
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={label}
      >
        <Text style={{ color: selected ? colors.buttonText : colors.primary }}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <CustomInput
        label="Título"
        placeholder="Ex: Estudar para a prova"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
      />
      <CustomInput
        label="Descrição"
        placeholder="Descreva a tarefa"
        value={description}
        onChangeText={setDescription}
        multiline
        error={errors.description}
      />

      <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
      <View style={styles.options}>
        {categories.map((c) => renderOption(c.name, category === c.name, () => setCategory(c.name)))}
      </View>
      {errors.category ? <Text style={{ color: colors.danger }}>{errors.category}</Text> : null}

      <Text style={[styles.label, { color: colors.text }]}>Status</Text>
      <View style={styles.options}>
        {statusList.map((s) => renderOption(statusLabel[s], status === s, () => setStatus(s)))}
      </View>

      <Text style={[styles.label, { color: colors.text }]}>Prioridade</Text>
      <View style={styles.options}>
        {priorityList.map((p) => renderOption(priorityLabel[p], priority === p, () => setPriority(p)))}
      </View>

      <CustomButton title={editingTask ? 'Salvar alterações' : 'Cadastrar'} onPress={handleSave} loading={saving} />
      <CustomButton title="Cancelar" onPress={() => navigation.goBack()} outline />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
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
