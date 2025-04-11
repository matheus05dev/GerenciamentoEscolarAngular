import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Aluno } from '../../core/types/Aluno';
import { AlunoService } from '../../core/services/aluno.service';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { CartaoAlunoComponent } from '../../shared/cartao-aluno/cartao-aluno.component';

@Component({
  selector: 'app-alunos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CartaoAlunoComponent
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent implements OnInit{
  constructor(private dialog: MatDialog, private service: AlunoService) { }
  ngOnInit(): void {
    this.BuscarAlunos();
  }

  alunos:Aluno[] = [];

  abrirDialogCriarAlunos() {
    this.dialog.open(CriarAlunoComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "Criado") {
          this.BuscarAlunos();
        }
      }
    });
  }

  BuscarAlunos() {
    this.service.buscarAlunos().subscribe({
      next: (value) => {
        console.log(value);
        this.alunos = value.content;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
