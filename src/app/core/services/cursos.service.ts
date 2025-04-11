import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../types/Curso';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  criarCurso(curso:Curso):Observable<any> {
    return this.http.post<Curso>(`http://localhost:8080/cursos`, curso)
  }

  buscarCursos():Observable<any> {
    return this.http.get<any>(`http://localhost:8080/cursos`)
  }

  deletarCurso(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/cursos/${id}`)
  }

  salvarImagem(id: number, form: Data): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/cursos/imagem/${id}`, form);
  }
}
