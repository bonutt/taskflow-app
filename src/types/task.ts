export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
}

// dados que vem do formulario
export interface TaskForm {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
}

export interface Category {
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { name: 'Estudos', icon: 'school-outline' },
  { name: 'Trabalho', icon: 'briefcase-outline' },
  { name: 'Pessoal', icon: 'person-outline' },
  { name: 'Saúde', icon: 'fitness-outline' },
  { name: 'Casa', icon: 'home-outline' },
];

export const statusLabel: Record<TaskStatus, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
};

export const priorityLabel: Record<TaskPriority, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};
