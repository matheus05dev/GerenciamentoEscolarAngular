/**
 * Importação dos tipos necessários
 * Endereco: Interface que define a estrutura de um endereço
 * Curso: Interface que define a estrutura de um curso
 */
import { Endereco } from './Endereco';
import { Curso } from './Curso';

/**
 * Interface que define a estrutura de um aluno no sistema
 * Contém todas as informações necessárias para representar um aluno
 * Esta interface é utilizada em toda a aplicação para tipagem de dados de alunos
 */
export interface Aluno {
  /**
   * ID único do aluno
   * @type {number}
   * Identificador único no banco de dados
   */
  id: number;

  /**
   * Curso ao qual o aluno está matriculado
   * @type {Curso}
   * Referência ao objeto Curso que contém os dados do curso
   */
  curso: Curso;

  /**
   * Número de matrícula do aluno
   * @type {string}
   * Identificador único da matrícula do aluno
   */
  matricula: string;

  /**
   * Nome completo do aluno
   * @type {string}
   * Nome como está registrado no sistema
   */
  nome: string;

  /**
   * Email de contato do aluno
   * @type {string}
   * Endereço de email para comunicação
   */
  email: string;

  /**
   * Número de telefone do aluno
   * @type {string}
   * Contato telefônico do aluno
   */
  telefone: string;

  /**
   * Endereço completo do aluno
   * @type {Endereco}
   * Objeto que contém todos os dados do endereço
   */
  endereco: Endereco;

  /**
   * URL da foto do aluno
   * @type {string}
   * Caminho para a foto de perfil do aluno
   */
  fotoUrl: string;
}
