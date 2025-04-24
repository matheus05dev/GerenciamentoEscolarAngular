/**
 * Importação dos módulos e componentes necessários
 * Component: Decorator para definir um componente Angular
 * MatInputModule: Campos de entrada do Material Design
 * MatSelectModule: Componentes de seleção do Material Design
 * MatButtonModule: Componentes de botão do Material Design
 * MatIconModule: Ícones do Material Design
 * FormGroup, FormControl: Classes para formulários reativos
 * Validators: Validadores de formulário
 * FormsModule, ReactiveFormsModule: Módulos para formulários
 * MatFormFieldModule: Campos de formulário do Material Design
 * CursosService: Serviço para operações com cursos
 * Curso: Interface que define a estrutura de um curso
 * ToastrService: Serviço para notificações
 * MatDialog, MatDialogRef: Serviços para diálogos modais
 */
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

/**
 * Componente para criação de novos cursos
 * Responsável por exibir e gerenciar o formulário de cadastro
 * @selector 'app-criar-cursos' - Seletor CSS para usar o componente
 * @imports - Lista de módulos necessários para o componente
 * @templateUrl - Template HTML do componente
 * @styleUrls - Estilos CSS do componente
 */
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
  /**
   * Formulário reativo para criação de cursos
   * Contém os campos e validações necessárias
   */
  curso: Curso = {
    id: 0,
    areaTecnologica: '',
    titulo: '',
    modalidade: '',
    imagemUrl: ''
  }

  /**
   * Formulário reativo para criação de cursos
   * Contém os campos e validações necessárias
   */
  form: FormGroup = new FormGroup({
    areaTecnologica: new FormControl("", [Validators.minLength(5)]),
    titulo: new FormControl("", [Validators.minLength(5)]),
    modalidade: new FormControl("PRESENCIAL")
  })

  /**
   * Construtor do componente
   * @param cursosService - Serviço para operações com cursos
   * @param toast - Serviço para exibição de notificações
   * @param dialog - Serviço para gerenciar diálogos modais
   * @param dialogRef - Referência ao diálogo atual
   */
  constructor(
    private service: CursosService,
    private toast: ToastrService,
    public dialog: MatDialogRef<CriarCursosComponent>
  ) { }

  /**
   * Método para salvar o curso
   * @returns void
   */
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



