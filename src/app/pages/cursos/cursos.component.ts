import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CriarCursosComponent } from './criar-cursos/criar-cursos.component';
import { CartaoCursoComponent } from '../../shared/cartao-curso/cartao-curso.component';
import { CursosService } from '../../core/services/cursos.service';
import { Curso } from '../../core/types/Curso';

@Component({
  selector: 'app-cursos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CartaoCursoComponent
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{
  constructor(private dialog: MatDialog, private service: CursosService) { }
  ngOnInit(): void {
    this.BuscarCursos();
  }

  cursos:Curso[] = [];

  abrirDialogCriarCurso() {
    this.dialog.open(CriarCursosComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "criado") {
          this.BuscarCursos();
        }
      }
    });
  }

  BuscarCursos() {
    this.service.buscarCursos().subscribe({
      next: (value) => {
        console.log(value);
        this.cursos = value.content;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

}
