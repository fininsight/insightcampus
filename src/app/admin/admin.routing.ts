import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { PageUserComponent } from './page-user/page-user.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
  {
      path: '', component: MainComponent
  },
  {
      path: 'user', component: PageUserComponent
  }
]}];

export const AdminRoutes = RouterModule.forChild(routes);
