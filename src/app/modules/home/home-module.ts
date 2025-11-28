import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './home-component/home-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent
  ]
})
export class HomeModule { }
