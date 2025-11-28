import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing-module';
import { RootComponent } from './root-component/root-component';
import { LoginComponent } from './login-component/login-component';
import { RegistrarComponent } from './registrar-component/registrar-component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RootRoutingModule,
    LoginComponent,
    RegistrarComponent,
    RootComponent
  ]
})
export class RootModule { }
