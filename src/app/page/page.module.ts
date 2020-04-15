import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassModule } from './class/class.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PageComponent } from './page.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';

import { PageRoutes } from './page.routing';


@NgModule({
  imports: [
    CommonModule,
    ClassModule,
    NgZorroAntdModule,
    PageRoutes,
  ],
  declarations: [
    PageComponent,
    MainComponent,
    NavComponent
  ]
})
export class PageModule { }
