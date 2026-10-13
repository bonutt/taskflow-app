import { User } from '../types/user';

// usuarios fixos (so pra fins didaticos, nao usar assim em producao)
export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin',
    name: 'Administrador',
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    role: 'user',
    name: 'Usuário Comum',
  },
];
