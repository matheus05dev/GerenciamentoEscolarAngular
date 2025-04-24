/**
 * Importação dos módulos e componentes necessários
 * Component: Decorator para definir um componente Angular
 * OnInit: Interface para inicialização do componente
 * MatButtonModule: Componentes de botão do Material Design
 * MatIconModule: Ícones do Material Design
 * MatDialog: Serviço para diálogos modais
 * FormsModule: Suporte a formulários
 * Subject: Para gerenciamento de eventos
 * debounceTime: Operador para controlar frequência de eventos
 * distinctUntilChanged: Operador para evitar eventos duplicados
 */
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { CartaoAlunoComponent } from '../../shared/cartao-aluno/cartao-aluno.component';
import { AlunoService } from '../../core/services/aluno.service';
import { Aluno } from '../../core/types/Aluno';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente de gerenciamento de alunos
 * Responsável por listar, pesquisar e criar novos alunos
 * @selector 'app-alunos' - Seletor CSS para usar o componente
 * @imports - Lista de módulos necessários para o componente
 * @templateUrl - Template HTML do componente
 * @styleUrl - Estilos CSS do componente
 */
@Component({
  selector: 'app-alunos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CartaoAlunoComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent implements OnInit {
  /**
   * Construtor do componente
   * @param dialog - Serviço para gerenciar diálogos modais
   * @param service - Serviço para operações com alunos
   */
  constructor(private dialog: MatDialog, private service: AlunoService) { }

  /**
   * Inicialização do componente
   * Carrega os alunos e configura a pesquisa
   */
  ngOnInit(): void {
    this.BuscarAlunos();
    this.configurarPesquisa();
  }

  // Lista de todos os alunos cadastrados no sistema
  alunos: Aluno[] = [];
  // Lista de alunos filtrados conforme critérios de pesquisa
  alunosFiltrados: Aluno[] = [];
  // Termo utilizado para pesquisa de alunos
  termoPesquisa: string = '';
  // Subject para controlar eventos de pesquisa com debounce
  private pesquisaSubject = new Subject<string>();
  // Flag para indicar se está em processo de pesquisa
  pesquisando: boolean = false;
  // Flag para controlar expansão da barra de pesquisa
  pesquisaExpandida = false;

  /**
   * Configura o comportamento da pesquisa com debounce
   * Evita múltiplas chamadas durante a digitação
   * Utiliza operadores RxJS para otimizar a performance
   */
  configurarPesquisa() {
    this.pesquisaSubject.pipe(
      debounceTime(300), // Aguarda 300ms após última digitação
      distinctUntilChanged() // Evita chamadas com mesmo valor
    ).subscribe(() => {
      this.pesquisarAlunos();
    });
  }

  /**
   * Abre o diálogo para criar um novo aluno
   * Atualiza a lista após a criação
   */
  abrirDialogCriarAlunos() {
    this.dialog.open(CriarAlunoComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "criado") {
          this.BuscarAlunos();
        }
      }
    });
  }

  /**
   * Busca todos os alunos do backend
   * Atualiza as listas de alunos
   */
  BuscarAlunos() {
    this.pesquisando = true;
    this.service.buscarAlunos().subscribe({
      next: (value) => {
        this.alunos = value.content;
        this.alunosFiltrados = [...this.alunos];
        this.pesquisando = false;
      },
      error: (err) => {
        console.error(`Erro ao buscar alunos: ${err.error?.error || 'Erro desconhecido'}`);
        this.pesquisando = false;
      },
    });
  }

  /**
   * Manipula mudanças no campo de pesquisa
   * Dispara o subject para aplicar o debounce
   * Chamado a cada alteração no input de pesquisa
   */
  onPesquisaChange() {
    this.pesquisaSubject.next(this.termoPesquisa);
  }

  /**
   * Filtra os alunos com base no termo de pesquisa
   * Busca correspondências no nome, matrícula, email e curso
   */
  pesquisarAlunos() {
    if (!this.termoPesquisa.trim()) {
      this.alunosFiltrados = [...this.alunos];
      return;
    }

    const termo = this.termoPesquisa.toLowerCase().trim();
    const termos = termo.split(' ').filter(t => t.length > 0);

    this.alunosFiltrados = this.alunos.filter(aluno => {
      const nome = aluno.nome.toLowerCase();
      const matricula = aluno.matricula.toLowerCase();
      const email = aluno.email.toLowerCase();
      const curso = aluno.curso.titulo.toLowerCase();

      // Verifica se todos os termos da pesquisa estão presentes em pelo menos um dos campos
      return termos.every(termo =>
        nome.includes(termo) ||
        matricula.includes(termo) ||
        email.includes(termo) ||
        curso.includes(termo)
      );
    });
  }

  /**
   * Limpa o campo de pesquisa e reseta os filtros
   */
  limparPesquisa() {
    this.termoPesquisa = '';
    this.alunosFiltrados = [...this.alunos];
  }

  togglePesquisa() {
    this.pesquisaExpandida = !this.pesquisaExpandida;
    if (!this.pesquisaExpandida) {
      this.termoPesquisa = '';
      this.onPesquisaChange();
    }
  }
}
