import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageStudentComponent } from './page-student.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  providers: [],
  declarations: [PageStudentComponent],
})
export class PageStudentModule { }
