/**
 * Importação dos módulos e tipos necessários
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../types/Curso';
import { Data } from '@angular/router';

/**
 * Serviço responsável por gerenciar as operações relacionadas aos cursos
 * Fornece métodos para criar, buscar, deletar e atualizar cursos
 */
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  /**
   * Construtor do serviço
   * @param http Cliente HTTP para realizar requisições ao backend
   */
  constructor(private http: HttpClient) { }

  /**
   * Cria um novo curso no sistema
   * @param curso Dados do curso a ser criado
   * @returns Observable com a resposta do servidor
   */
  criarCurso(curso:Curso):Observable<any> {
    return this.http.post<Curso>(`http://localhost:8080/cursos`, curso)
  }

  /**
   * Busca todos os cursos cadastrados
   * @returns Observable com a lista de cursos
   */
  buscarCursos():Observable<any> {
    return this.http.get<any>(`http://localhost:8080/cursos`)
  }

  /**
   * Remove um curso do sistema
   * @param id ID do curso a ser removido
   * @returns Observable com a resposta do servidor
   */
  deletarCurso(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/cursos/${id}`)
  }

  /**
   * Salva uma imagem para um curso específico
   * @param id ID do curso
   * @param form Dados do formulário com a imagem
   * @returns Observable com a resposta do servidor
   */
  salvarImagem(id: number, form: Data): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/cursos/imagem/${id}`, form);
  }
}
