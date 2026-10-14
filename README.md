# TaskFlow App

Checkpoint 2 de React Native - FIAP

App de gerenciamento de tarefas feito com React Native, Expo e TypeScript. O usuário faz login, cadastra suas tarefas, edita, muda o status, exclui e filtra. Os dados ficam salvos no celular com AsyncStorage e a Home mostra uma frase motivacional que vem de uma API.

## Integrantes

| Nome | RM |
|------|----|
| Henrique Maciel Rodrigues | RM559628 |
| Luigi Pereira Bonuccelli | RM560950 |
| Pedro Paulo Sabino Botelho | RM559578 |
| Igor Nociti | RM560225 |
| João Pedro Vieira de Morais | RM560527 |

## Vídeo

Link: https://youtu.be/-CjnmYgIN-Q

## Credenciais para teste

| Usuário | Senha | Perfil |
|---------|-------|--------|
| admin | 123 | admin (abre na aba Configurações) |
| user | 123 | user (abre na aba Home) |

## Funcionalidades

- Login com mensagem de erro quando o usuário ou a senha estão errados
- Sessão salva no AsyncStorage (se fechar e abrir o app continua logado)
- Logout
- Admin abre em Configurações e user abre na Home
- Header com nome, perfil e botão de sair
- Cadastrar, listar, ver detalhes, editar e excluir tarefas (CRUD)
- Confirmação antes de excluir
- Mudar o status da tarefa na tela de detalhes
- Cada usuário vê só as próprias tarefas
- Filtro por status (todas, pendentes, em andamento, concluídas)
- Mensagem quando não tem nenhuma tarefa
- Validação do formulário (título com no mínimo 3 caracteres, descrição com no mínimo 5, categoria obrigatória)
- Frase motivacional da API com loading, mensagem de erro e botão de tentar novamente
- Tema claro e escuro salvo no AsyncStorage
- Escolher o tratamento (Sr., Sra., Srta.)

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation (Bottom Tabs e Native Stack)
- Context API (AuthContext, TaskContext e ThemeContext)
- AsyncStorage
- Fetch
- Ionicons (@expo/vector-icons)

## API

DummyJSON - https://dummyjson.com/quotes/random

## Estrutura

```
src/
  components/   -> componentes reutilizáveis (botão, input, card, header...)
  context/      -> AuthContext, TaskContext e ThemeContext
  data/         -> usuários do login
  hooks/        -> useAuth, useTasks e useTheme
  routes/       -> navegação (AppRoutes, TabRoutes, TaskStackRoutes)
  screens/      -> telas do app
  services/     -> AsyncStorage e API
  types/        -> tipos do TypeScript
  utils/        -> funções de data, id e validação
App.tsx
```

## Como rodar

Precisa ter o Node.js instalado e o app Expo Go no celular.

```bash
npm install
npx expo start
```

Depois é só escanear o QR Code com o Expo Go.
