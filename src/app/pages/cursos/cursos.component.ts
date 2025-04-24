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
import { CriarCursosComponent } from './criar-cursos/criar-cursos.component';
import { CartaoCursoComponent } from '../../shared/cartao-curso/cartao-curso.component';
import { CursosService } from '../../core/services/cursos.service';
import { Curso } from '../../core/types/Curso';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Componente de gerenciamento de cursos
 * Responsável por listar, pesquisar e criar novos cursos
 * @selector 'app-cursos' - Seletor CSS para usar o componente
 * @imports - Lista de módulos necessários para o componente
 * @templateUrl - Template HTML do componente
 * @styleUrl - Estilos CSS do componente
 */
@Component({
  selector: 'app-cursos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CartaoCursoComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {
  /**
   * Construtor do componente
   * @param dialog - Serviço para gerenciar diálogos modais
   * @param service - Serviço para operações com cursos
   */
  constructor(private dialog: MatDialog, private service: CursosService) { }

  /**
   * Inicialização do componente
   * Carrega os cursos e configura a pesquisa
   */
  ngOnInit(): void {
    this.BuscarCursos();
    this.configurarPesquisa();
  }

  // Lista de todos os cursos cadastrados no sistema
  cursos: Curso[] = [];
  // Lista de cursos filtrados conforme critérios de pesquisa
  cursosFiltrados: Curso[] = [];
  // Termo utilizado para pesquisa de cursos
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
      this.pesquisarCursos();
    });
  }

  /**
   * Abre o diálogo para criar um novo curso
   * Atualiza a lista após a criação
   */
  abrirDialogCriarCurso() {
    this.dialog.open(CriarCursosComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "criado") {
          this.BuscarCursos();
        }
      }
    });
  }

  /**
   * Busca todos os cursos do backend
   * Atualiza as listas de cursos
   */
  BuscarCursos() {
    this.pesquisando = true;
    this.service.buscarCursos().subscribe({
      next: (value) => {
        this.cursos = value.content;
        this.cursosFiltrados = [...this.cursos];
        this.pesquisando = false;
      },
      error: (err) => {
        console.error(`Erro ao buscar cursos: ${err.error?.error || 'Erro desconhecido'}`);
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
   * Filtra os cursos com base no termo de pesquisa
   * Busca correspondências no título, área e modalidade
   */
  pesquisarCursos() {
    if (!this.termoPesquisa.trim()) {
      this.cursosFiltrados = [...this.cursos];
      return;
    }

    const termo = this.termoPesquisa.toLowerCase().trim();
    const termos = termo.split(' ').filter(t => t.length > 0);

    this.cursosFiltrados = this.cursos.filter(curso => {
      const titulo = curso.titulo.toLowerCase();
      const area = curso.areaTecnologica.toLowerCase();
      const modalidade = curso.modalidade.toLowerCase();

      // Verifica se todos os termos da pesquisa estão presentes em pelo menos um dos campos
      return termos.every(termo =>
        titulo.includes(termo) ||
        area.includes(termo) ||
        modalidade.includes(termo)
      );
    });
  }

  /**
   * Limpa o campo de pesquisa e reseta os filtros
   */
  limparPesquisa() {
    this.termoPesquisa = '';
    this.cursosFiltrados = [...this.cursos];
  }

  togglePesquisa() {
    this.pesquisaExpandida = !this.pesquisaExpandida;
    if (!this.pesquisaExpandida) {
      this.termoPesquisa = '';
      this.onPesquisaChange();
    }
  }
}
