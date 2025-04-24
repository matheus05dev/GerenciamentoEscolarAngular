/**
 * Interface que define a estrutura do formulário de aluno
 * Utilizada para criar e atualizar alunos no sistema
 * Combina informações do aluno e seu endereço em uma única estrutura
 */
export interface AlunoForm {
  /** ID único do aluno (opcional para criação) */
  id: number;
  /** ID do curso ao qual o aluno será matriculado */
  cursoId: number;
  /** Número de matrícula do aluno */
  matricula: string;
  /** Nome completo do aluno */
  nome: string;
  /** Email de contato do aluno */
  email: string;
  /** Número de telefone do aluno */
  telefone: string;
  /** Nome do país do endereço */
  pais: string;
  /** Nome do estado/província do endereço */
  estado: string;
  /** Nome da cidade do endereço */
  cidade: string;
  /** Nome do bairro do endereço */
  bairro: string;
  /** Código postal (CEP) do endereço */
  cep: string;
  /** Nome da rua do endereço */
  rua: string;
  /** Número do endereço */
  numero: string;
  /** URL da foto do aluno (opcional) */
  fotoUrl: string;
}
