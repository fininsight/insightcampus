import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageClassComponent } from './page-class.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ClassService } from '../core/services/class.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    ClassService
  ],
  declarations: [
    PageClassComponent
  ]
})
export class PageClassModule { }
