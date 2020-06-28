import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageClassNoticeComponent } from './page-class-notice.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ClassNoticeService } from '../core/services/class-notice.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    ClassNoticeService
  ],
  declarations: [
    PageClassNoticeComponent
  ]
})
export class PageClassNoticeModule { }
