import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PageTeacherComponent } from './page-teacher.component';
import { TeacherService } from '../core/services/teacher.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PageTeacherComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [
    TeacherService,
    DatePipe,
    AuthService,
    UserService,
  ],
})
export class PageTeacherModule { }
