import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureComponent } from './lecture.component';
import { LectureRoutes } from './lecture.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  imports: [
    LectureRoutes,
    NzIconModule,
    CommonModule,
  ],
  declarations: [
    LectureComponent
  ]
})
export class LectureModule { }
