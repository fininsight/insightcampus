import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutes } from './page.routing';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    PageRoutes,
    NgZorroAntdModule
  ],
  declarations: [
    PageComponent,
    MainComponent,
    NavComponent
  ]
})
export class PageModule { }
