/**
 * Importação dos módulos e serviços necessários para o componente
 * CommonModule: Fornece diretivas comuns como *ngIf, *ngFor
 * RouterModule: Permite navegação entre rotas
 * MatButtonModule: Componentes de botão do Material Design
 * MatIconModule: Ícones do Material Design
 * MatFormFieldModule: Campos de formulário do Material Design
 * MatInputModule: Campos de entrada do Material Design
 * MatSelectModule: Componentes de seleção do Material Design
 * MatProgressSpinnerModule: Spinner de carregamento do Material Design
 * FormsModule: Suporte a formulários e two-way binding
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../core/services/cursos.service';
import { AlunoService } from '../../core/services/aluno.service';
import { firstValueFrom } from 'rxjs';

/**
 * Interface que define a estrutura de um curso
 * @property id - Identificador único do curso
 * @property titulo - Nome do curso
 * @property areaTecnologica - Área de tecnologia do curso
 * @property modalidade - Modalidade de ensino (presencial, online, etc)
 * @property imagemUrl - URL opcional para imagem do curso
 */
interface Curso {
  id: number;
  titulo: string;
  areaTecnologica: string;
  modalidade: string;
  imagemUrl?: string;
}

/**
 * Interface que define a estrutura da resposta paginada da API
 * content: Array com os itens da página atual
 * totalElements: Total de itens em todas as páginas
 * totalPages: Total de páginas
 * size: Tamanho da página
 * number: Número da página atual
 */
interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/**
 * Componente da página inicial
 * Responsável por exibir e gerenciar a listagem de cursos
 * @selector 'app-home' - Seletor CSS para usar o componente
 * @standalone true - Indica que é um componente independente
 * @imports - Lista de módulos necessários para o componente
 * @templateUrl - Template HTML do componente
 * @styleUrls - Estilos CSS do componente
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Lista de todos os cursos disponíveis
  cursos: Curso[] = [];
  // Lista de cursos filtrados conforme critérios de busca
  cursosFiltrados: Curso[] = [];
  // Lista de áreas tecnológicas únicas para o filtro
  areasTecnologicas: string[] = [];
  // Área selecionada no filtro
  areaFiltro: string = '';
  // Termo de pesquisa para filtrar cursos
  termoPesquisa: string = '';
  // Flag para indicar se está carregando dados
  pesquisando: boolean = false;
  // Total de alunos cadastrados no sistema
  totalAlunos: number = 0;
  // Média de alunos por curso
  mediaAlunosPorCurso: number = 0;

  // Intervalo para o carrossel de imagens
  private carouselInterval: any;
  // Índice do slide atual
  private currentSlide = 0;
  // Lista de elementos do carrossel
  private readonly slides = document.querySelectorAll('.carousel-item');

  /**
   * Construtor do componente
   * @param cursosService - Serviço para operações com cursos
   * @param alunoService - Serviço para operações com alunos
   */
  constructor(
    private cursosService: CursosService,
    private alunoService: AlunoService
  ) {}

  /**
   * Inicialização do componente
   * Carrega dados iniciais e configura o carrossel
   */
  ngOnInit(): void {
    this.carregarDados();
    this.iniciarCarrossel();
  }

  /**
   * Limpeza ao destruir o componente
   * Remove o intervalo do carrossel para evitar memory leaks
   */
  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  /**
   * Carrega os dados iniciais da página
   * Busca cursos e alunos de forma assíncrona
   * Atualiza as estatísticas e listas do componente
   */
  private async carregarDados(): Promise<void> {
    try {
      this.pesquisando = true;
      // Busca cursos e alunos simultaneamente
      const [cursosResponse, alunosResponse] = await Promise.all([
        firstValueFrom(this.cursosService.buscarCursos()),
        firstValueFrom(this.alunoService.buscarAlunos())
      ]);

      // Atualiza as listas e estatísticas
      this.cursos = (cursosResponse as PageResponse<Curso>).content;
      this.cursosFiltrados = (cursosResponse as PageResponse<Curso>).content;
      this.totalAlunos = (alunosResponse as PageResponse<any>).content?.length || 0;
      this.areasTecnologicas = [...new Set(this.cursos.map(curso => curso.areaTecnologica))];
      this.calcularMediaAlunosPorCurso();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.pesquisando = false;
    }
  }

  /**
   * Calcula a média de alunos por curso
   * Arredonda o resultado para o número inteiro mais próximo
   */
  private calcularMediaAlunosPorCurso(): void {
    if (this.cursos.length > 0) {
      this.mediaAlunosPorCurso = Math.round(this.totalAlunos / this.cursos.length);
    }
  }

  /**
   * Aplica os filtros quando o usuário seleciona uma área
   */
  filtrarCursos(): void {
    this.aplicarFiltros();
  }

  /**
   * Aplica os filtros quando o usuário digita na pesquisa
   */
  onPesquisaChange(): void {
    this.aplicarFiltros();
  }

  /**
   * Limpa o campo de pesquisa e reseta os filtros
   */
  limparPesquisa(): void {
    this.termoPesquisa = '';
    this.aplicarFiltros();
  }

  /**
   * Aplica os filtros de área e termo de pesquisa nos cursos
   * Filtra por área tecnológica e/ou termo de pesquisa
   * Atualiza a lista de cursos filtrados
   */
  private aplicarFiltros(): void {
    this.cursosFiltrados = this.cursos.filter(curso => {
      const matchArea = !this.areaFiltro || curso.areaTecnologica === this.areaFiltro;
      const matchTermo = !this.termoPesquisa ||
        curso.titulo.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        curso.areaTecnologica.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      return matchArea && matchTermo;
    });
  }

  private iniciarCarrossel(): void {
    this.carouselInterval = setInterval(() => {
      this.proximoSlide();
    }, 5000); // Muda a cada 5 segundos
  }

  private proximoSlide(): void {
    const slides = document.querySelectorAll('.carousel-item');
    slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % slides.length;
    slides[this.currentSlide].classList.add('active');
  }
}

