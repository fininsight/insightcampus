import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes
  ],
  declarations: [
    AdminComponent,
    MainComponent
  ]
})
export class AdminModule { }
