import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutes } from './page.routing';
import { MainComponent } from './main/main.component';


@NgModule({
  imports: [
    CommonModule,
    PageRoutes
  ],
  declarations: [
    PageComponent,
    MainComponent
  ]
})
export class PageModule { }
