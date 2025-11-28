import { Routes } from '@angular/router';
import { LoginComponent } from './modules/root/login-component/login-component';
import { homeGuard } from '../core/security/home-guard'; // ajuste o caminho se necessário

export const routes: Routes = [
  // Rota raiz → redireciona para login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Tela de login
  { path: 'login', component: LoginComponent },

  // Home protegido por guard
  {
    path: 'home',
    canActivate: [homeGuard],
    loadChildren: () =>
      import('./modules/home/home-module').then(m => m.HomeModule)
  },

  // Caso nenhuma rota seja encontrada → redireciona para login
  { path: '**', redirectTo: 'login' }
];
