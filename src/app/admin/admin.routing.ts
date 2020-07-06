import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { PageUserComponent } from './page-user/page-user.component';
import { PageCodeComponent } from './page-code/page-code.component';
import { PageClassComponent } from './page-class/page-class.component';
import { PageClassNoticeComponent } from './page-class-notice/page-class-notice.component'
import { PageCurriculumComponent } from './page-curriculum/page-curriculum.component';
import { PageReviewComponent } from './page-review/page-review.component';
import { PageIncamAddfareComponent } from './page-incam-addfare/page-incam-addfare.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
  {
      path: '', component: MainComponent
  },
  {
      path: 'user', component: PageUserComponent
  },
  {
      path: 'code', component: PageCodeComponent
  },
  {
      path: 'class', component: PageClassComponent
  },
  {
      path: 'class-notice', component: PageClassNoticeComponent
  },
  {
      path: 'curriculum', component: PageCurriculumComponent
  },
  {
      path: 'review', component: PageReviewComponent
  },
  {
      path: 'incam-addfare', component: PageIncamAddfareComponent
  }

]}];

export const AdminRoutes = RouterModule.forChild(routes);
