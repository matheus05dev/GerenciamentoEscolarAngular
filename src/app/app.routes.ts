/**
 * Importação dos módulos necessários para configuração das rotas
 */
import { Routes } from '@angular/router';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { AlunosComponent } from './pages/alunos/alunos.component';

/**
 * Definição das rotas da aplicação
 * Estrutura hierárquica de navegação com layout principal (SidenavComponent)
 * e componentes filhos para cada seção
 */
export const routes: Routes = [
    {
        path: '',  // Rota raiz
        component: SidenavComponent,  // Layout principal com menu lateral
        children: [  // Rotas filhas que serão renderizadas dentro do layout
            {
                path: 'home',  // Rota para a página inicial
                component: HomeComponent
            },
            {
                path: 'cursos',  // Rota para a página de cursos
                component: CursosComponent
            },
            {
                path: 'alunos',  // Rota para a página de alunos
                component: AlunosComponent
            }
        ]
    }
];
