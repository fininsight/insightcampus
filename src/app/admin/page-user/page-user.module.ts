import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUserComponent } from './page-user.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  declarations: [
    PageUserComponent
  ]
})
export class PageUserModule { }
