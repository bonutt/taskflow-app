import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasks, saveTasks } from '../services/taskStorage';
import { categories, Task, TaskForm, TaskStatus } from '../types/task';
import { generateId } from '../utils/generateId';

interface TaskContextData {
  tasks: Task[]; // so as tarefas do usuario logado
  loading: boolean;
  addTask: (form: TaskForm) => Promise<void>;
  updateTask: (id: string, form: TaskForm) => Promise<void>;
  changeStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

function getIcon(categoryName: string): string {
  const cat = categories.find((c) => c.name === categoryName);
  return cat ? cat.icon : 'pricetag-outline';
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // carrega as tarefas salvas quando o app inicia
  useEffect(() => {
    async function load() {
      try {
        const saved = await getTasks();
        setAllTasks(saved);
      } catch (error) {
        console.log('Erro ao carregar tarefas', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // salva no AsyncStorage e atualiza o estado
  async function updateList(newList: Task[]) {
    await saveTasks(newList);
    setAllTasks(newList);
  }

  async function addTask(form: TaskForm) {
    if (!user) return;

    const now = new Date().toISOString();
    const newTask: Task = {
      id: generateId(),
      userId: user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      category: form.category,
      categoryIcon: getIcon(form.category),
      createdAt: now,
      updatedAt: now,
    };

    await updateList([newTask, ...allTasks]);
  }

  async function updateTask(id: string, form: TaskForm) {
    const newList = allTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
          priority: form.priority,
          category: form.category,
          categoryIcon: getIcon(form.category),
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });
    await updateList(newList);
  }

  async function changeStatus(id: string, status: TaskStatus) {
    const newList = allTasks.map((task) =>
      task.id === id ? { ...task, status: status, updatedAt: new Date().toISOString() } : task,
    );
    await updateList(newList);
  }

  async function deleteTask(id: string) {
    const newList = allTasks.filter((task) => task.id !== id);
    await updateList(newList);
  }

  // cada usuario so ve as proprias tarefas
  const tasks = user ? allTasks.filter((task) => task.userId === user.id) : [];

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, changeStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
