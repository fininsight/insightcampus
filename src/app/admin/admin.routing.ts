import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { PageUserComponent } from './page-user/page-user.component';
import { PageCodeComponent } from './page-code/page-code.component';
import { PageCurriculumComponent } from './page-curriculum/page-curriculum.component';

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
      path: 'curriculum', component: PageCurriculumComponent
  }

]}];

export const AdminRoutes = RouterModule.forChild(routes);
