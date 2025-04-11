import { Component } from '@angular/core';
import { DialogFormComponent } from '../../../shared/dialog-form/dialog-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CursosService } from '../../../core/services/cursos.service';
import { Curso } from '../../../core/types/Curso';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-criar-cursos',
  imports: [
    DialogFormComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './criar-cursos.component.html',
  styleUrl: './criar-cursos.component.css'
})

export class CriarCursosComponent {
  curso: Curso = {
    id: 0,
    areaTecnologica: '',
    titulo: '',
    modalidade: '',
    imagemUrl: ''
  }

  form: FormGroup = new FormGroup({
    areaTecnologica: new FormControl("", [Validators.minLength(5)]),
    titulo: new FormControl("", [Validators.minLength(5)]),
    modalidade: new FormControl("PRESENCIAL")
  })

  constructor(
    private service: CursosService,
    private toast: ToastrService,
    public dialog: MatDialogRef<CriarCursosComponent>
  ) { }

  salvarCurso() {
    if (this.form.invalid) {
      this.toast.info('Necessário preencher os campos corretamente', 'INFO')
      return;
    }
    this.curso.areaTecnologica = this.form.get('areaTecnologica')?.value;
    this.curso.titulo = this.form.get('titulo')?.value;
    this.curso.modalidade = this.form.get('modalidade')?.value;
    this.service.criarCurso(this.curso).subscribe({
      next: (value) => {
        console.log(value);
        this.toast.success('Sucesso ao criar curso', 'SUCESSO');
        this.dialog.close("criado");
      },
      error: (err) => {
        console.log(err);
        this.toast.error(`Erro ao criar curso ${err.error.error}`, 'ERRO');
      }
    })
  }
}



