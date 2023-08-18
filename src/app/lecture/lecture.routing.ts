import { Routes, RouterModule } from '@angular/router';
import { LectureComponent } from './lecture.component';

const routes: Routes = [{
  path: '',
  component: LectureComponent,
  children: [
    {
      path: ':class_seq', component: LectureComponent
    },
]}];

export const LectureRoutes = RouterModule.forChild(routes);