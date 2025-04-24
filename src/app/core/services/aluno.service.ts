/**
 * Importação dos módulos e tipos necessários
 */
import { Aluno } from './../types/Aluno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { AlunoForm } from '../types/AlunoForm';

/**
 * Serviço responsável por gerenciar as operações relacionadas aos alunos
 * Fornece métodos para criar, buscar, deletar e atualizar alunos
 */
@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  /**
   * Construtor do serviço
   * @param http Cliente HTTP para realizar requisições ao backend
   */
  constructor(private http: HttpClient) { }

  /**
   * Cria um novo aluno no sistema
   * @param aluno Dados do aluno a ser criado
   * @returns Observable com a resposta do servidor
   */
  criarAluno(aluno:AlunoForm):Observable<any> {
    return this.http.post<Aluno>(`http://localhost:8080/alunos`, aluno)
  }

  /**
   * Busca todos os alunos cadastrados
   * @returns Observable com a lista de alunos
   */
  buscarAlunos():Observable<any> {
    return this.http.get<any>(`http://localhost:8080/alunos`)
  }

  /**
   * Remove um aluno do sistema
   * @param id ID do aluno a ser removido
   * @returns Observable com a resposta do servidor
   */
  deletarAluno(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/alunos/${id}`)
  }

  /**
   * Salva uma foto para um aluno específico
   * @param id ID do aluno
   * @param form Dados do formulário com a foto
   * @returns Observable com a resposta do servidor
   */
  salvarImagem(id: number, form: Data): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/alunos/foto/${id}`, form);
  }
}
