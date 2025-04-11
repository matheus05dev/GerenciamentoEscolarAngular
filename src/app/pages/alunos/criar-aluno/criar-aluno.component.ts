import { Component, OnInit } from '@angular/core';
import { DialogFormComponent } from '../../../shared/dialog-form/dialog-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { Aluno } from '../../../core/types/Aluno';
import { AlunoService } from '../../../core/services/aluno.service';
import { AlunoForm } from '../../../core/types/AlunoForm';
import { MatIconModule } from '@angular/material/icon';
import { CursosService } from '../../../core/services/cursos.service';

@Component({
  selector: 'app-criar-aluno',
  imports: [
    DialogFormComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './criar-aluno.component.html',
  styleUrls: ['./criar-aluno.component.css']
})
export class CriarAlunoComponent implements OnInit {

  aluno: AlunoForm = {
    id: 0,
    cursoId: 0,
    matricula: '',
    nome: '',
    email: '',
    telefone: '',
    pais: '',
    estado: '',
    cidade: '',
    bairro: '',
    cep: '',
    rua: '',
    numero: ''
  }

  form: FormGroup = new FormGroup({
    cursoId: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    rua: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required])
  });
  cursos: any;

  constructor(
    private service: AlunoService,
    private cursoService: CursosService,
    private toast: ToastrService,
    public dialog: MatDialogRef<CriarAlunoComponent>,
  ) { }

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos() {
    this.cursoService.buscarCursos().subscribe({
      next: (value) => {
        this.cursos = value.content;
      },
      error: (err) => {
        this.toast.error(`Erro ao carregar cursos: ${err.error.error}`, 'Erro');
      }
    });
  }

  salvarAluno() {
    if (this.form.invalid) {
      this.toast.info('E necessario preencher todos os campos corretamente', 'INFO')
      return;
    }
    this.aluno.cursoId = this.form.get('cursoId')?.value;
    this.aluno.matricula = this.form.get('matricula')?.value;
    this.aluno.nome = this.form.get('nome')?.value;
    this.aluno.email = this.form.get('email')?.value;
    this.aluno.telefone = this.form.get('telefone')?.value;
    this.aluno.pais = this.form.get('pais')?.value;
    this.aluno.estado = this.form.get('estado')?.value;
    this.aluno.cidade = this.form.get('cidade')?.value;
    this.aluno.bairro = this.form.get('bairro')?.value;
    this.aluno.cep = this.form.get('cep')?.value;
    this.aluno.rua = this.form.get('rua')?.value;
    this.aluno.numero = this.form.get('numero')?.value;
    this.service.criarAluno(this.aluno).subscribe({
      next: (value) => {
        console.log(value)
        this.toast.success('Sucesso ao criar aluno', 'Sucesso');
        this.dialog.close("Criado");
      },
      error: (err) => {
        console.log(err)
        this.toast.error(`Erro ao criar aluno: ${err.error.error}`, 'Erro');
      }
    })
  }
}
