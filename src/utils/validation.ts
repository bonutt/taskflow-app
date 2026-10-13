import { categories, TaskForm } from '../types/task';

export interface FormErrors {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
}

export function validateTask(form: TaskForm): FormErrors {
  const errors: FormErrors = {};

  if (form.title.trim() === '') {
    errors.title = 'O título é obrigatório';
  } else if (form.title.trim().length < 3) {
    errors.title = 'O título precisa ter pelo menos 3 caracteres';
  }

  if (form.description.trim() === '') {
    errors.description = 'A descrição é obrigatória';
  } else if (form.description.trim().length < 5) {
    errors.description = 'A descrição precisa ter pelo menos 5 caracteres';
  }

  if (!['pendente', 'em_andamento', 'concluida'].includes(form.status)) {
    errors.status = 'Status inválido';
  }

  if (!['baixa', 'media', 'alta'].includes(form.priority)) {
    errors.priority = 'Prioridade inválida';
  }

  const categoriaExiste = categories.find((c) => c.name === form.category);
  if (!categoriaExiste) {
    errors.category = 'Escolha uma categoria';
  }

  return errors;
}
