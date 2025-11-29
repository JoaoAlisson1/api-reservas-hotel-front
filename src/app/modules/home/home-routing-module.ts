import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../home/home-component/home-component'; //avaliar
import {DashboardComponent} from './dashboard-component/dashboard-component';
import {homeGuard} from '../../../core/security/home-guard';
import { FuncionarioComponent } from '../funcionario/funcionario.component';
import {QuartoComponent} from '../quarto/quarto.component';
import {HospedeComponent} from '../hospede/hospede.component';
import {ReservaComponent} from '../reserva/reserva.component';
import {UsuarioComponent} from '../usuario/usuario.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivateChild: [homeGuard], children:
      [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        { path: 'funcionario', component: FuncionarioComponent },
        { path: 'quartos', component: QuartoComponent },
        { path: 'hospede', component: HospedeComponent },
        { path: 'reservas', component: ReservaComponent },
        {path: 'usuario', component: UsuarioComponent}

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
