import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PageUserModule } from './page-user/page-user.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    NgZorroAntdModule,
    PageUserModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    MainComponent,
    NavComponent
  ]
})
export class AdminModule { }
