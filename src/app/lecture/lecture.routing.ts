import { Routes, RouterModule } from '@angular/router';
import { LectureComponent } from './lecture.component';

const routes: Routes = [{
  path: '',
  component: LectureComponent,
  children: [
    {
      path: ':id', component: LectureComponent
    },
]}];

export const LectureRoutes = RouterModule.forChild(routes);