import { Aluno } from './../../core/types/Aluno';
import { AlunoService } from './../../core/services/aluno.service';
import { Curso } from './../../core/types/Curso';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartao-aluno',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './cartao-aluno.component.html',
  styleUrl: './cartao-aluno.component.css'
})
export class CartaoAlunoComponent {

  @Input() aluno!: Aluno;
  @Output() alunoDeletado = new EventEmitter<any>();

  constructor(private AlunoService: AlunoService, private toast: ToastrService) { }

  ngOnInit(): void {
    console.log(this.aluno);
  }

  deletarAluno() {
    this.AlunoService.deletarAluno(this.aluno.id).subscribe({
      next: () => {
        this.toast.success('Aluno deletado com sucesso!');
        this.alunoDeletado.emit();
      },
      error: (err) => {
        this.toast.error(`Erro ao deletar aluno: ${err.error.error}`, "ERRO");
      }
    });
  }

  salvarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const form = new FormData();
      form.append("file", file);
      this.AlunoService.salvarImagem(this.aluno.id, form).subscribe({
        next: (value) => {
          this.toast.success('Imagem salva com sucesso!' , "SUCESSO");
          console.log(value);
          this.aluno.imagemUrl = value.imagemUrl;
        },
        error: (err) => {
          this.toast.error(`Erro ao salvar imagem: ${err.error.error}`, "ERRO");
        }
      });
    }
  }
}
