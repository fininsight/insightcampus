import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureComponent } from './lecture.component';
import { LectureRoutes } from './lecture.routing';



@NgModule({
  imports: [
    LectureRoutes,
    CommonModule,
  ],
  declarations: [
    LectureComponent
  ]
})
export class LectureModule { }
