import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageStudentComponent } from './page-student.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NzSelectModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [],
  declarations: [PageStudentComponent],
})
export class PageStudentModule { }
