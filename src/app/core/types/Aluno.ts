import { Endereco } from './Endereco';
import { Curso } from './Curso';
export interface Aluno {
  id: number;
  curso: Curso;
  matricula: string
  nome: string
  email: string
  telefone: string
  endereco: Endereco;
  imagemUrl: string
}
