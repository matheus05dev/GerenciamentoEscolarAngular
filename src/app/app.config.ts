/**
 * Importação dos módulos necessários para configuração da aplicação
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideToastr} from 'ngx-toastr';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'

/**
 * Configuração principal da aplicação Angular
 * Define os providers necessários para o funcionamento da aplicação
 */
export const appConfig: ApplicationConfig = {
  providers:
  [
    // Configuração de detecção de mudanças para melhor performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuração do roteamento da aplicação
    provideRouter(routes),

    // Configuração do cliente HTTP para requisições
    provideHttpClient(),

    // Configuração do sistema de notificações toast
    provideToastr({
      progressBar: true,      // Exibe barra de progresso
      closeButton: true,      // Permite fechar manualmente
      preventDuplicates: true,// Evita notificações duplicadas
      autoDismiss: true,      // Fecha automaticamente
      timeOut: 3000          // Tempo em ms antes de fechar
    }),

    // Habilita animações na aplicação
    provideAnimations()
  ]
};
