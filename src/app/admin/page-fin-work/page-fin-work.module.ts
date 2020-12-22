import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PageFinWorkComponent } from './page-fin-work.component';
import { FinWorkService } from '../core/services/fin-work.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageFinWorkComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [
    FinWorkService,
    DatePipe,
    AuthService,
    UserService,
  ],
})
export class PageFinWorkModule { }
