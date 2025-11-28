import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './modules/root/login-component/login-component';
import {FuncionarioComponent} from './modules/funcionario/funcionario.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home-module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
