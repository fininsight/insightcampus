import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PageWpboardNoticeComponent } from './page-wpboard-notice.component';
import { WpboardNoticeService } from '../core/services/wpboardnotice.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageWpboardNoticeComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [
    WpboardNoticeService,
    DatePipe,
    AuthService,
    UserService,
  ],
})
export class PageWpboardNoticeModule { }
