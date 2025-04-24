/**
 * Importação dos módulos necessários do Angular
 * Component: Decorator para definir um componente Angular
 * RouterOutlet: Componente para renderizar as rotas da aplicação
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Decorator que define o componente principal da aplicação
 * @selector 'app-root' - Seletor CSS para usar o componente no template
 * @imports [RouterOutlet] - Importa o componente RouterOutlet para gerenciar as rotas
 * @templateUrl './app.component.html' - Template HTML associado ao componente
 * @styleUrl './app.component.css' - Arquivo de estilos CSS associado ao componente
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

/**
 * Classe principal da aplicação
 * Responsável por inicializar e gerenciar o componente raiz
 * Esta é a classe que serve como ponto de entrada da aplicação
 */
export class AppComponent {
  /**
   * Título da aplicação
   * @type {string}
   * Este título é usado para identificar a aplicação e pode ser usado em diferentes partes do sistema
   */
  title = 'gerenciamento-escolar';
}
