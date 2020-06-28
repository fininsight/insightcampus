import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PageUserModule } from './page-user/page-user.module';
import { PageCodeModule } from './page-code/page-code.module';
import { PageClassModule } from './page-class/page-class.module';
import { PageCurriculumModule } from './page-curriculum/page-curriculum.module';
import { AuthService } from './core/services/auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AdminRoutes,
    CommonModule,
    NgZorroAntdModule,
    PageUserModule,
    PageCodeModule,
    PageClassModule,
    PageCurriculumModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  declarations: [
    AdminComponent,
    MainComponent,
    NavComponent
  ]
})
export class AdminModule { }
