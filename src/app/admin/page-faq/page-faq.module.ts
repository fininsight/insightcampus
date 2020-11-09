import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PageFaqComponent } from './page-faq.component';
import { FaqService } from '../core/services/faq.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageFaqComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [
    FaqService,
    DatePipe,
    AuthService,
    UserService,
  ],
})
export class PageFaqModule { }
