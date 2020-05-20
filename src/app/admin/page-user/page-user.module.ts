import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUserComponent } from './page-user.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UserService } from '../core/services/user.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    PageUserComponent
  ]
})
export class PageUserModule { }
