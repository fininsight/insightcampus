import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOrderManageComponent } from './page-order-manage.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [],
  declarations: [PageOrderManageComponent],
})
export class PageOrderManageModule { }
