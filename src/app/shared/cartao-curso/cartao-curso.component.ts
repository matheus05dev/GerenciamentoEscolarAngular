import { CursosService } from './../../core/services/cursos.service';
import { Curso } from './../../core/types/Curso';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartao-curso',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './cartao-curso.component.html',
  styleUrl: './cartao-curso.component.css'
})
export class CartaoCursoComponent {

  @Input() curso!: Curso;
  @Output() cursoDeletado = new EventEmitter<any>();

  constructor(private cursoService: CursosService, private toast: ToastrService) { }

  ngOnInit(): void {
    console.log(this.curso);
  }

  deletarCurso() {
    this.cursoService.deletarCurso(this.curso.id).subscribe({
      next: () => {
        this.toast.success('Curso deletado com sucesso!');
        this.cursoDeletado.emit();
      },
      error: (err) => {
        this.toast.error(`Erro ao deletar curso: ${err.error.error}`, "ERRO");
      }
    });
  }

  salvarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const form = new FormData();
      form.append("file", file);
      this.cursoService.salvarImagem(this.curso.id, form).subscribe({
        next: (value) => {
          this.toast.success('Imagem salva com sucesso!' , "SUCESSO");
          console.log(value);
          this.curso.imagemUrl = value.imagemUrl;
        },
        error: (err) => {
          this.toast.error(`Erro ao salvar imagem: ${err.error.error}`, "ERRO");
        }
      });
    }
  }
}
