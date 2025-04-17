import { Aluno } from './../types/Aluno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { AlunoForm } from '../types/AlunoForm';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  criarAluno(aluno:AlunoForm):Observable<any> {
    return this.http.post<Aluno>(`http://localhost:8080/alunos`, aluno)
  }

  buscarAlunos():Observable<any> {
    return this.http.get<any>(`http://localhost:8080/alunos`)
  }

  deletarAluno(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/alunos/${id}`)
  }

  salvarImagem(id: number, form: Data): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/alunos/foto/${id}`, form);
  }
}
