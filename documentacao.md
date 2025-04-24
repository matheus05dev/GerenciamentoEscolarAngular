# Documentação do Projeto de Gerenciamento Escolar

## Estrutura do Projeto

O projeto está organizado em uma estrutura Angular com os seguintes diretórios principais:

### Diretórios Principais
- `/src`: Contém o código fonte principal da aplicação
  - `/app`: Diretório principal da aplicação
    - `/layouts`: Contém os layouts da aplicação
    - `/components`: Contém os componentes reutilizáveis

## Componentes

### Layouts
Os layouts são responsáveis pela estrutura básica da aplicação, incluindo:
- Cabeçalho
- Menu de navegação
- Área de conteúdo principal
- Rodapé

### Componentes
Os componentes são elementos reutilizáveis da interface, cada um com responsabilidades específicas.

## Variáveis e Estados

### Variáveis Globais
- `isLoading`: Controla o estado de carregamento da aplicação
- `errorMessage`: Armazena mensagens de erro
- `successMessage`: Armazena mensagens de sucesso

### Estados de Autenticação
- `isAuthenticated`: Indica se o usuário está autenticado
- `currentUser`: Armazena informações do usuário atual

## Métodos Principais

### Autenticação
- `login()`: Realiza o processo de login
- `logout()`: Realiza o processo de logout
- `checkAuth()`: Verifica o estado de autenticação

### Gerenciamento de Dados
- `loadData()`: Carrega dados necessários
- `saveData()`: Salva alterações
- `updateData()`: Atualiza informações
- `deleteData()`: Remove dados

### Navegação
- `navigateTo()`: Controla a navegação entre páginas
- `goBack()`: Retorna à página anterior

## Serviços

### Serviços Principais
- `AuthService`: Gerencia autenticação
- `DataService`: Gerencia dados
- `NotificationService`: Gerencia notificações

## Observações Importantes

1. **Segurança**
   - Todas as requisições são autenticadas
   - Dados sensíveis são criptografados
   - Tokens de acesso são gerenciados automaticamente

2. **Performance**
   - Lazy loading implementado para otimização
   - Caching de dados quando apropriado
   - Compressão de assets

3. **Manutenção**
   - Código segue padrões Angular
   - Documentação atualizada regularmente
   - Testes automatizados implementados

## Fluxo de Dados

1. Usuário interage com a interface
2. Componente processa a interação
3. Serviço é chamado para operações
4. API é consultada quando necessário
5. Dados são atualizados na interface
6. Feedback é fornecido ao usuário

## Boas Práticas Implementadas

1. **Código**
   - TypeScript strict mode
   - Linting configurado
   - Formatação consistente

2. **Arquitetura**
   - Componentes modulares
   - Serviços reutilizáveis
   - Estado gerenciado eficientemente

3. **UI/UX**
   - Design responsivo
   - Feedback visual claro
   - Acessibilidade considerada

## Métodos de Gerenciamento Escolar

### Gerenciamento de Cursos

#### Busca e Listagem
- `buscarCursos()`: Retorna lista de todos os cursos cadastrados
  - Parâmetros: 
    - `filtro`: Filtro opcional para busca
    - `pagina`: Número da página para paginação
    - `itensPorPagina`: Quantidade de itens por página
  - Retorno: Lista de cursos com informações básicas

- `buscarCursoPorId(id: number)`: Busca um curso específico
  - Parâmetros:
    - `id`: ID do curso
  - Retorno: Dados completos do curso

#### Operações CRUD
- `salvarCurso(curso: Curso)`: Cria ou atualiza um curso
  - Parâmetros:
    - `curso`: Objeto com dados do curso
  - Retorno: Curso salvo com ID gerado

- `atualizarCurso(id: number, curso: Curso)`: Atualiza dados de um curso
  - Parâmetros:
    - `id`: ID do curso
    - `curso`: Dados atualizados
  - Retorno: Curso atualizado

- `excluirCurso(id: number)`: Remove um curso
  - Parâmetros:
    - `id`: ID do curso
  - Retorno: Confirmação da exclusão

### Gerenciamento de Alunos

#### Busca e Listagem
- `buscarAlunos()`: Retorna lista de todos os alunos
  - Parâmetros:
    - `filtro`: Filtro opcional para busca
    - `pagina`: Número da página
    - `itensPorPagina`: Itens por página
  - Retorno: Lista de alunos com informações básicas

- `buscarAlunoPorId(id: number)`: Busca um aluno específico
  - Parâmetros:
    - `id`: ID do aluno
  - Retorno: Dados completos do aluno

- `buscarAlunosPorCurso(cursoId: number)`: Lista alunos de um curso
  - Parâmetros:
    - `cursoId`: ID do curso
  - Retorno: Lista de alunos do curso

#### Operações CRUD
- `salvarAluno(aluno: Aluno)`: Cria ou atualiza um aluno
  - Parâmetros:
    - `aluno`: Objeto com dados do aluno
  - Retorno: Aluno salvo com ID gerado

- `atualizarAluno(id: number, aluno: Aluno)`: Atualiza dados de um aluno
  - Parâmetros:
    - `id`: ID do aluno
    - `aluno`: Dados atualizados
  - Retorno: Aluno atualizado

- `excluirAluno(id: number)`: Remove um aluno
  - Parâmetros:
    - `id`: ID do aluno
  - Retorno: Confirmação da exclusão

### Atualização de Páginas

#### Métodos de Atualização
- `atualizarListaCursos()`: Atualiza a lista de cursos na interface
  - Função: Recarrega dados dos cursos
  - Eventos: Disparado após operações CRUD

- `atualizarListaAlunos()`: Atualiza a lista de alunos na interface
  - Função: Recarrega dados dos alunos
  - Eventos: Disparado após operações CRUD

- `atualizarPagina()`: Atualiza a página atual
  - Função: Recarrega todos os dados necessários
  - Eventos: Disparado após mudanças significativas

### Pesquisas e Filtros

#### Métodos de Pesquisa
- `pesquisarCursos(termo: string)`: Pesquisa cursos por termo
  - Parâmetros:
    - `termo`: Termo de busca
  - Retorno: Lista filtrada de cursos

- `pesquisarAlunos(termo: string)`: Pesquisa alunos por termo
  - Parâmetros:
    - `termo`: Termo de busca
  - Retorno: Lista filtrada de alunos

- `aplicarFiltros(filtros: Filtro[])`: Aplica múltiplos filtros
  - Parâmetros:
    - `filtros`: Array de filtros a serem aplicados
  - Retorno: Dados filtrados

#### Filtros Disponíveis
- Por nome
- Por status
- Por data
- Por curso
- Por período
- Por matrícula 