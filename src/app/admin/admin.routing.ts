import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
{
    path: '', component: MainComponent
}
]}];

export const AdminRoutes = RouterModule.forChild(routes);
