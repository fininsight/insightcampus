import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { PageEmailLogComponent } from './page-email-log.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EmailLogService } from '../core/services/emaillog.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [
    PageEmailLogComponent
  ],
  providers: [
    DatePipe,
    AuthService,
    EmailLogService
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class PageEmailLogModule { }
